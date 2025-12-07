"use client";

import { ROUTES } from "@/shared/model/routes";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Home() {
    const router = useRouter();

    useLayoutEffect(() => {
        router.push(ROUTES.BOARDS.EDITOR);
    }, [router]);

    return <></>;
}
