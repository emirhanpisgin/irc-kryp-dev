"use server";

import { auth } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher";
import { db } from "@/db";
import { messages, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function sendMessageAction(messageContent: string) {
	const session = await auth();

	if (!session) return;

	const [message] = await db
		.insert(messages)
		.values({
			userId: session.user?.id!,
			content: messageContent,
		})
		.returning();

	await pusherServer.trigger("main-channel", "message-add", {
		id: message.id,
		username: session.user?.name,
		content: messageContent,
	});
}

export async function deleteMessageAction(messageId: string) {
	const session = await auth();

	if (!session) return;

	const [user] = await db.select().from(users).where(eq(users.id, session.user?.id!));

	if (user.id !== process.env.ADMIN_USER_ID) return;

	await db.delete(messages).where(eq(messages.id, messageId));

	await pusherServer.trigger("main-channel", "message-delete", messageId);
}

export async function changeNameAction(name: string) {
	const session = await auth();

	if (!session) return;

	await db.update(users).set({
		name,
	}).where(eq(users.id, session.user?.id!));
}
