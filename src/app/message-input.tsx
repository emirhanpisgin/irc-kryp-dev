"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState, useTransition } from "react";
import React from 'react';
import type { SVGProps } from 'react';
import { sendMessageAction } from "./actions";

export default function MessageInput() {
    const [pending, startTransition] = useTransition();
    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState("");

    async function handleMessageSubmit(formData: FormData) {
        startTransition(async () => {
            const message = formData.get("message")!.toString();
            await sendMessageAction(message);
            setInput("");
        });
    }

    return (
        <form action={handleMessageSubmit} className="p-3 border-t-2 flex gap-3 bg-white">
            <Input disabled={pending} ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} name="message" required placeholder="Mesaj..." className="mx-auto" />
            <Button disabled={pending} type="submit">
                {pending ? <LoadingIcon className="size-12 p-2" /> : "Gönder"}
            </Button>
        </form>
    );
}

export function LoadingIcon(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" {...props}><g fill="none" stroke="white" strokeLinecap="round" strokeWidth={2}><path strokeDasharray={60} strokeDashoffset={60} strokeOpacity={0.3} d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"></animate></path><path strokeDasharray={15} strokeDashoffset={15} d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"></animate><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></g></svg>);
}