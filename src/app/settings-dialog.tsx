import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import React, { useState, useTransition } from 'react';
import type { SVGProps } from 'react';
import { changeNameAction } from "./actions";

export default function SettingsDialog() {
    const { data, status } = useSession();
    console.log(data);
    const [pending, startTransition] = useTransition();

    function handleNameChange(formData: FormData) {
        startTransition(async () => {
            const name = formData.get("name")?.toString()!;
            await changeNameAction(name);
        });
    }

    return (
        <Dialog>
            <DialogTrigger>
                <SettingsIcon className="size-7" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ayarlar</DialogTitle>
                </DialogHeader>
                <form action={handleNameChange} className="flex gap-3">
                    <Input name="name" disabled={pending} minLength={5} maxLength={25} defaultValue={data?.user?.name!} />
                    <Button disabled={pending} type="submit" className="aspect-square p-1">
                        {pending ? <LoadingIcon className="size-12" /> : <SaveIcon className="size-12" />}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>

    );
}

function SettingsIcon(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 28 28" {...props}><path fill="currentColor" d="M14 9.5a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9M11 14a3 3 0 1 1 6 0a3 3 0 0 1-6 0m10.71 8.395l-1.728-.759a1.72 1.72 0 0 0-1.542.086c-.467.27-.765.747-.824 1.284l-.208 1.88a.92.92 0 0 1-.703.796a11.7 11.7 0 0 1-5.412 0a.92.92 0 0 1-.702-.796l-.208-1.877a1.7 1.7 0 0 0-.838-1.281a1.7 1.7 0 0 0-1.526-.086l-1.728.759a.92.92 0 0 1-1.043-.215a12.1 12.1 0 0 1-2.707-4.672a.92.92 0 0 1 .334-1.016l1.527-1.128a1.7 1.7 0 0 0 0-2.74l-1.527-1.125a.92.92 0 0 1-.334-1.017A12.06 12.06 0 0 1 5.25 5.821a.92.92 0 0 1 1.043-.214l1.72.757a1.707 1.707 0 0 0 2.371-1.376l.21-1.878a.92.92 0 0 1 .715-.799q1.32-.294 2.704-.311c.902.01 1.8.115 2.68.311a.92.92 0 0 1 .715.8l.209 1.878a1.7 1.7 0 0 0 1.688 1.518c.233 0 .464-.049.68-.144l1.72-.757a.92.92 0 0 1 1.043.214a12.06 12.06 0 0 1 2.708 4.667a.92.92 0 0 1-.333 1.016l-1.525 1.127c-.435.32-.698.829-.698 1.37c0 .54.263 1.049.699 1.37l1.526 1.126c.316.234.45.642.334 1.017a12.1 12.1 0 0 1-2.707 4.667a.92.92 0 0 1-1.043.215m-5.447-.198a3.16 3.16 0 0 1 1.425-1.773a3.22 3.22 0 0 1 2.896-.161l1.344.59a10.6 10.6 0 0 0 1.97-3.398l-1.189-.877v-.001a3.2 3.2 0 0 1-1.309-2.578c0-1.027.497-1.98 1.307-2.576l.002-.001l1.187-.877a10.6 10.6 0 0 0-1.971-3.397l-1.333.586l-.002.001c-.406.18-.843.272-1.286.272a3.2 3.2 0 0 1-3.178-2.852v-.002l-.163-1.46a11.5 11.5 0 0 0-1.95-.193q-1.01.014-1.975.193l-.163 1.461A3.207 3.207 0 0 1 7.41 7.737l-1.336-.588a10.6 10.6 0 0 0-1.971 3.397l1.19.877a3.2 3.2 0 0 1 0 5.155l-1.19.878a10.6 10.6 0 0 0 1.97 3.403l1.345-.59a3.2 3.2 0 0 1 2.878.16a3.2 3.2 0 0 1 1.579 2.411v.005l.162 1.464c1.297.255 2.63.255 3.927 0l.162-1.467q.036-.332.138-.645"></path></svg>);
}

function SaveIcon(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 32 32" {...props}><path fill="currentColor" d="m27.71 9.29l-5-5A1 1 0 0 0 22 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V10a1 1 0 0 0-.29-.71M12 6h8v4h-8Zm8 20h-8v-8h8Zm2 0v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8H6V6h4v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.41l4 4V26Z"></path></svg>);
}

function LoadingIcon(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" {...props}><g fill="none" stroke="white" strokeLinecap="round" strokeWidth={2}><path strokeDasharray={60} strokeDashoffset={60} strokeOpacity={0.3} d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"></animate></path><path strokeDasharray={15} strokeDashoffset={15} d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"></animate><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></g></svg>);
}