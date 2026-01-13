"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { ROUTES } from "@/shared/model/routes";

export default function Home() {
    const router = useRouter();

    useLayoutEffect(() => {
        router.push(ROUTES.BOARDS.EDITOR);
    }, [router]);

    return <div>Home</div>;
}
