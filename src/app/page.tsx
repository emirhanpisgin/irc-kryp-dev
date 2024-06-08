import { auth } from "@/lib/auth";
import SignIn from "./sign-in";
import MessageFeed from "./message-feed";
import MessageInput from "./message-input";

export default async function Home() {
    const session = await auth();

    return (
        <main>
            {session && session.user ? (
                <div className="h-screen w-screen flex flex-col">
                    <MessageFeed isAdmin={session.user.id === process.env.ADMIN_USER_ID} />
                    <MessageInput />
                </div>
            ) : (
                <div className="flex flex-col items-center gap-2">
                    Lütfen mesaj gönderebilmek veya görmek için giriş yapın.
                    <SignIn />
                </div>
            )}
        </main>
    );
}
