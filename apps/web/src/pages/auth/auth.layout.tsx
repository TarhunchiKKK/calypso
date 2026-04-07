import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/kit";

type Props = {
    card: {
        title: React.ReactNode;
        description: React.ReactNode;
        footerContent: React.ReactNode;
    };
    form: React.ReactNode;
};

export function AuthLayout({ card, form }: Props) {
    return (
        <main>
            <Card className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-100">
                <CardHeader>
                    <CardTitle>{card.title}</CardTitle>

                    <CardDescription>{card.description}</CardDescription>
                </CardHeader>

                <CardContent>{form}</CardContent>

                <CardFooter id="footer" className="flex justify-center mb-2">
                    <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary">{card.footerContent} </p>
                </CardFooter>
            </Card>
        </main>
    );
}
