"use client";

import { useEffect, useRef } from 'react';
import { MessageContext } from "@/components/context/message-context";
import { useContext } from "react";

export default function MessageFeed() {
    const { messages } = useContext(MessageContext)!;
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView();
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto flex justify-end flex-col">
            {messages.map((message) => (
                <div key={message.id} className="whitespace-pre-wrap w-full break-words px-2 py-1 border-t-2">
                    <div className="inline">{`${message.username}: `}</div>
                    <div className="inline">
                        {message.content}
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}
