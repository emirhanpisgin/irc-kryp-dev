import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { messages, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
	const session = await auth();

	if (!session) return new Response("Unauthorized");

	const lastMessages = await db.select().from(messages).limit(20).leftJoin(users, eq(users.id, messages.userId));

	return new Response(
		JSON.stringify(
			lastMessages
				.map(({ message, user }) => ({
					id: message.id,
					username: user?.name,
					content: message.content,
					createdAt: message.createdAt,
				}))
				.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
		)
	);
}
