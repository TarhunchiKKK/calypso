import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Calypso",
    description: "Manage your boards and create new ones",
    keywords: ["boards", "list", "management", "creation"],
    openGraph: {
        title: "Dashboard | Calypso",
        description: "Manage your boards and create new ones"
    },
    robots: {
        index: false,
        follow: false
    }
};

export default function DashboardPage() {
    return <div>Dashboard</div>;
}
