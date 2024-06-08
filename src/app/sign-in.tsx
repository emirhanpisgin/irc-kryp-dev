"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignIn() {
    return (
        <Button className="w-min" onClick={() => signIn()}>
            Giriş Yap
        </Button>
    );
}
