"use client";

import { useEffect, useRef, useContext } from 'react';
import { MessageContext } from "@/components/context/message-context";
import type { SVGProps } from 'react';
import { deleteMessageAction } from './actions';

export default function MessageFeed({
    isAdmin
}: {
    isAdmin: boolean
}) {
    const { messages } = useContext(MessageContext)!;
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView();
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message) => (
                <div key={message.id} className="whitespace-pre-wrap relative w-full break-words px-2 py-1 group border-t-2">
                    <div className="inline font-semibold">{`${message.username}: `}</div>
                    <div className="inline">
                        {message.content}
                    </div>
                    {isAdmin && (
                        <div className="absolute top-0 z-10 right-0 aspect-square opacity-0 group-hover:opacity-100 transition-opacity">
                            <CrossIcon className="size-8 text-black cursor-pointer text-secondary-foreground" onClick={() => deleteMessageAction(message.id)} />
                        </div>
                    )}
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

export function CrossIcon(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 16 16" {...props}><path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"></path></svg>);
}