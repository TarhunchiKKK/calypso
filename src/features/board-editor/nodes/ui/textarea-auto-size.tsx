import clsx from "clsx";
import React, { useRef, useState, useLayoutEffect } from "react";

type Props = {
    initialValue: string;

    isActive: boolean;

    onEditingEnd?: (value: string) => void;
};

export function TextareaAutoSize({ isActive, initialValue, onEditingEnd }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(initialValue);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        if (!ref.current) return;

        const { scrollWidth, clientHeight } = ref.current;
        setHeight(clientHeight);
        setWidth(scrollWidth);
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            onEditingEnd?.(value);
        }
    };

    const handleBlur = () => onEditingEnd?.(value);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value);

    return (
        <div className="relative">
            <div ref={ref} className={clsx("whitespace-pre-wrap ", isActive && "opacity-0")}>
                {value}
            </div>
            {isActive && (
                <textarea
                    className="absolute left-0 top-0 resize-none overflow-hidden focus:outline-none"
                    value={value}
                    autoFocus
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ width: width + 2, height: height + 2 }}
                />
            )}
        </div>
    );
}
