import { StylesPanel } from "@/features/board-editor/modules/styling";

export default function Page() {
    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: 200, left: 600 }}>
            <StylesPanel fontFamily fontSize backgroundColor borderColor borderRadius borderStyle color fontStyle fontWeight textAlign textDecoration />
        </div>
    );
}
