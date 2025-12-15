import clsx from "clsx";
import React, { useRef, useState, RefObject } from "react";

type WrapperProps = {
    value: string;

    isActive: boolean;

    onEditingEnd?: (value: string) => void;
};

function Wrapper({ value, isActive, onEditingEnd }: WrapperProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div ref={ref} className="relative w-full h-full flex flex-col">
            <div className={clsx("whitespace-pre-wrap w-full h-full overflow-hidden", isActive && "opacity-0")}>
                {value}
            </div>

            {isActive && <Textarea initialValue={value} onEditingEnd={onEditingEnd} wrapperRef={ref} />}
        </div>
    );
}

type TextareaPops = {
    initialValue: string;

    onEditingEnd?: (_: string) => void;

    wrapperRef: RefObject<HTMLDivElement | null>;
};

function Textarea({ initialValue, onEditingEnd }: TextareaPops) {
    const [value, setValue] = useState(initialValue);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            onEditingEnd?.(value);
        }
    };

    const handleBlur = () => onEditingEnd?.(value);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value);

    return (
        <textarea
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 resize-none overflow-visible focus:outline-none text-center"
            value={value}
            autoFocus
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onChange={handleChange}
            // style={{ width: width + 2, height: height + 2 }}
        />
    );
}

export const TextareaAutoSize = Wrapper;
