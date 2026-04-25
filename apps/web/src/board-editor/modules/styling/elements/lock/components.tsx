import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import type { ElementProps } from "../../lib/types";

type Props = ElementProps & {
    value: boolean;
};

export function Lock({ value, update }: Props) {
    const handleClick = () => {
        update(node => ({ ...node, locked: value }));
    };

    return (
        <>
            {value && <LockKeyhole onClick={handleClick} className="cursor-pointer" />}

            {!value && <LockKeyholeOpen onClick={handleClick} className="cursor-pointer" />}
        </>
    );
}
