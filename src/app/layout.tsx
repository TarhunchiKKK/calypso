import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { PropsWithChildren } from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "Calypso | Online Whiteboard",
    description: "Online virtual whiteboard tool that lets you easily sketch diagrams that have a hand-drawn feel to them.",
    keywords: ["whiteboard", "board", "editor", "diagram", "drawing", "stickers", "arrows", "images", "videos"],
    openGraph: {
        type: "website",
        locale: "en_US",
        title: "Calypso | Online Whiteboard",
        description: "Endless online brainstorming and planning board",
        siteName: "Calypso"
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    }
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
        </html>
    );
}
