import { type CSSProperties, useLayoutEffect, useRef } from "react";
import { cn } from "../lib/shadcn";
import { Textarea } from "./kit";

type Props = {
    value: string;

    onChange?: (value: string) => void;

    style?: CSSProperties;

    className?: string;

    disabled?: boolean;
};

function useAutoFontSize(value: string) {
    const ref = useRef<HTMLTextAreaElement | null>(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: The `value` tracking is needed to call this effect
    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) {
            return;
        }

        let fontSize = 40;
        el.style.fontSize = `${fontSize}px`;

        while (el.scrollHeight > el.offsetHeight && fontSize > 12) {
            fontSize--;
            el.style.fontSize = `${fontSize}px`;
        }
        console.log(fontSize);
    }, [value]);

    return ref;
}

export function TextareaAutoFontSize({ value, onChange, style, className, disabled }: Props) {
    const ref = useAutoFontSize(value);

    return (
        <Textarea
            ref={ref}
            value={value}
            onChange={e => onChange?.(e.target.value)}
            disabled={disabled}
            style={style}
            className={cn(
                "w-full h-full p-0 bg-transparent border-none resize-none overflow-hidden",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "text-center font-medium leading-tight shadow-none",
                className
            )}
        />
    );
}
