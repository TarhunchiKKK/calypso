import { useState } from "react";

type CancellationPair = {
    do: () => void;

    undo: () => void;
};

export function useCancellationStore() {
    const [pairs, setPairs] = useState<CancellationPair[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    const push = (pair: CancellationPair) => {
        if (currentIndex === null) {
            setCurrentIndex(0);
            setPairs([pair]);
            return;
        }

        const newIndex = currentIndex + 1;

        setCurrentIndex(newIndex);
        setPairs(prev => [...prev.slice(0, newIndex), pair]);
    };

    const pop = () => {
        if (currentIndex === null) {
            return;
        }

        setCurrentIndex(prev => (prev ? prev - 1 : null));
        setPairs(prev => prev.slice(0, prev.length - 1));
    };

    return { push, pop, current: currentIndex !== null ? pairs[currentIndex] : null };
}
