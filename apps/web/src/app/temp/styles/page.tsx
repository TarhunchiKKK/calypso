"use client";

import { StylesBar } from "@/features/board-editor/modules/styling";

export default function Page() {
    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: 200, left: 600 }}>
            <StylesBar onUpdate={() => {}} />
        </div>
    );
}
