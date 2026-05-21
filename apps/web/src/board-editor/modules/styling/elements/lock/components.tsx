import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import type { UpdateFn } from "../../lib/types";

type Props = {
    value: boolean;

    update: (fn: UpdateFn) => void;
};

export function Lock({ value, update }: Props) {
    const handleClick = () => {
        update((node) => ({ ...node, locked: value }));
    };

    return (
        <>
            {value && <LockKeyhole onClick={handleClick} className="cursor-pointer" />}

            {!value && <LockKeyholeOpen onClick={handleClick} className="cursor-pointer" />}
        </>
    );
}
