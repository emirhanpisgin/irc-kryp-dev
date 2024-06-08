import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
    title: "IRC App",
    description: "Built by KrypDev",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(
                "h-screen bg-background font-sans overflow-hidden antialiased grid place-items-center text-black",
                fontSans.variable
            )}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
