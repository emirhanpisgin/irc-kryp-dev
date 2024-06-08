"use server";

import { auth } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher";
import { db } from "@/db";
import { messages } from "@/db/schema";

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

	const res = await pusherServer.trigger("main-channel", "main-event", {
		id: message.id,
		username: session.user?.name,
		content: messageContent,
	});
}
