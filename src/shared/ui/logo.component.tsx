import Image from "next/image";

export function Logo() {
    return (
        <div className="flex flex-row justify-between items-center gap-2">
            <div className="text-xl font-bold">Calypso</div>

            <div className="w-max">
                <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            </div>
        </div>
    );
}
