"use client";
import { ReactNode } from "react";
import { MessageProvider } from "./context/message-context";

export default function Providers({
    children
}: {
    children: ReactNode
}) {
    return (
        <MessageProvider>
            {children}
        </MessageProvider>
    );
}
