import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In | Calypso",
    description: "Log in to your Calypso account to access your boards and collaborate.",
    keywords: ["sign in", "account", "access"],
    openGraph: {
        title: "Sign In | Calypso",
        description: "Log in to your Calypso account to access your boards and collaborate"
    },
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false
        }
    }
};

export default function SignInPage() {
    return <div>Sign In</div>;
}
