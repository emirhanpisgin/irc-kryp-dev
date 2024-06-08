import { pusherClient } from '@/lib/pusher';
import axios from 'axios';
import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';

interface MessageContextType {
    messages: Message[];
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

interface MessageProviderProps {
    children: ReactNode;
}

interface Message {
    id: string,
    username: string,
    content: string
}

const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (messages.length === 0) {
            getPreviousMessages();
        }

        pusherClient.subscribe("main-channel");

        const handleMessageReceived = (message: Message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        };

        const handleMessageDeleted = (messageId: string) => {
            setMessages(prevMessages => [...prevMessages].filter((message) => message.id !== messageId));
        }

        pusherClient.bind("message-add", handleMessageReceived);
        pusherClient.bind("message-delete", handleMessageDeleted);

        return () => {
            pusherClient.unsubscribe("main-channel");
            pusherClient.unbind("message-add", handleMessageReceived);
            pusherClient.unbind("message-delete", handleMessageDeleted);
        };
    }, []);

    async function getPreviousMessages() {
        const { data } = await axios.get("/api/messages");

        if (!Array.isArray(data)) return;

        setMessages((prevMessages) => [...prevMessages, ...data]);
    }

    return (
        <MessageContext.Provider value={{ messages }}>
            {children}
        </MessageContext.Provider>
    );
};

export function useMessages() {
    const context = useContext(MessageContext);

    if (!context) throw "";

    return context;
}

export { MessageContext, MessageProvider };
