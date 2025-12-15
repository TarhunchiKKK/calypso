import clsx from "clsx";
import React, { useRef, useState, RefObject, useEffect, useLayoutEffect, useCallback } from "react";

const recalculateFontSize = (
    value: string,
    setFontSize: (_: number) => void,
    wrapper: HTMLDivElement,
    measure: HTMLDivElement
) => {
    const { width: maxW, height: maxH } = wrapper.getBoundingClientRect();

    measure.style.width = `${Math.max(10, Math.floor(maxW))}px`;
    measure.style.height = `${maxH}px`;

    const text = value || " ";

    let lo = 8;
    let hi = Math.max(8, Math.floor(maxH));
    let best = lo;

    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        measure.style.fontSize = `${mid}px`;
        measure.textContent = text;

        const fits = measure.scrollWidth <= maxW + 1 && measure.scrollHeight <= maxH + 1;

        if (fits) {
            best = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    setFontSize(best);
};

type Props = {
    value: string;

    isActive: boolean;

    onEditingEnd?: (value: string) => void;
};

export function Wrapper({ value: initialValue, isActive, onEditingEnd }: Props) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const measureRef = useRef<HTMLDivElement | null>(null);

    const [value, setValue] = useState(initialValue);
    const [fontSize, setFontSize] = useState<number>(24);

    const measureAndFit = useCallback(() => {
        if (!wrapperRef.current || !measureRef.current) {
            return;
        }

        recalculateFontSize(value, setFontSize, wrapperRef.current, measureRef.current);
    }, [value]);

    useLayoutEffect(() => {
        measureAndFit();
    }, [value, measureAndFit]);

    useEffect(() => {
        if (!wrapperRef.current) {
            return;
        }

        const observer = new ResizeObserver(() => measureAndFit());

        observer.observe(wrapperRef.current);

        return () => observer.disconnect();
    }, [measureAndFit]);

    const handleEditingEnd = (v: string) => {
        setValue(v);

        onEditingEnd?.(v);
    };

    return (
        <div ref={wrapperRef} className="relative w-full h-full flex flex-col">
            <div
                className={clsx("whitespace-pre-wrap w-full h-full overflow-hidden", isActive && "opacity-0")}
                style={{ fontSize }}
            >
                {value}
            </div>

            {isActive && (
                <>
                    <Textarea
                        value={value}
                        onValueChange={setValue}
                        onEditingEnd={handleEditingEnd}
                        fontSize={fontSize}
                        wrapperRef={wrapperRef}
                    />

                    <div
                        ref={measureRef}
                        className="absolute top-0 left-0 invisible pointer-events-none whitespace-pre-wrap w-full h-full wrap-break-word break-all"
                        style={{ wordWrap: "break-word" }}
                    />
                </>
            )}
        </div>
    );
}

type TextareaProps = {
    value: string;
    onValueChange: (v: string) => void;
    onEditingEnd?: (_: string) => void;
    fontSize: number;
    wrapperRef: RefObject<HTMLDivElement | null>;
};

function Textarea({ value, onValueChange, onEditingEnd, fontSize }: TextareaProps) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            onEditingEnd?.(value);
        }
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            onEditingEnd?.(value);
        }
    };

    const handleBlur = () => onEditingEnd?.(value);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => onValueChange(e.target.value);

    return (
        <textarea
            wrap="soft"
            className="absolute inset-0 m-1 resize-none overflow-auto focus:outline-none text-center whitespace-pre-wrap wrap-break-word break-all"
            value={value}
            autoFocus
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onChange={handleChange}
            style={{ fontSize, width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
        />
    );
}

export const TextareaAutoSize = Wrapper;
