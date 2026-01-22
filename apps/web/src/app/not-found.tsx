import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/kit";

const fontSize = 112;
const logoSize = 160;

export default function NotFoundPage() {
    return (
        <div className="absolute w-screen h-screen flex flex-col justify-center items-center bg-black">
            <div className="text-white">
                <div className="flex flex-row justify-center items-center gap-2">
                    <div className="font-bold italic" style={{ fontSize }}>
                        4
                    </div>

                    <Image src="/logo.svg" alt="Logo" width={logoSize} height={logoSize} />

                    <div className="font-bold italic" style={{ fontSize }}>
                        4
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-3xl font-bold italic pb-4">Oops, Page Not Found!</p>

                    <p className="text-xl font-bold italic pb-6">This page currently not exists.</p>

                    <Button variant="outline" size="lg">
                        <Link href={ROUTES.HOME} className="font-bold text-xl italic">
                            Return Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
