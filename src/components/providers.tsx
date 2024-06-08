"use client";
import { ReactNode } from "react";
import { MessageProvider } from "./context/message-context";
import { ThemeProvider } from "./theme-provider";
import { SessionProvider } from "next-auth/react";

export default function Providers({
    children
}: {
    children: ReactNode
}) {
    return (
        <MessageProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <SessionProvider>
                    {children}
                </SessionProvider>
            </ThemeProvider>
        </MessageProvider>
    );
}
