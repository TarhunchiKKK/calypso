import type { Metadata } from "next";

// FUTURE: Replace with `generateMetadata` function
export const metadata: Metadata = {
    title: "Dashboard | Calypso"
};

export default function BoardPage({ id }: { id: string }) {
    return <div>{id}</div>;
}
