import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up | Calypso",
    description: "Sign up for Calypso and get access to a free online collaboration board.",
    keywords: ["sign-up", "join", "access", "free"],
    openGraph: {
        title: "Sign Up | Calypso",
        description: "Sign up for Calypso and get access to a free online collaboration board"
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

export default function SignUpPage() {
    return <div>Sign Up</div>;
}
