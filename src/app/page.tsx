import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/lib/auth";
import SignIn from "./sign-in";

export default async function Home() {
    const session = await auth();

    return (
        <main>
            {session ? (
                <div>

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
