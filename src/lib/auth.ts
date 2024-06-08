import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import { db } from "@/db";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import discord from "next-auth/providers/discord";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db),
	providers: [github, google, discord],
	pages: {
		signIn: "/login",
	},
});
