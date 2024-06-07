import { auth } from "@/lib/auth";

export default async function Home() {
    const session = await auth();

    return (
        <main className="grid place-items-center h-screen">
            {session ? (
                <div>

                </div>
            ) : (
                <div>
                    Lütfen mesaj gönderebilmek veya görmek için giriş yapın.
                    <div>

                    </div>
                </div>
            )}
        </main>
    );
}
