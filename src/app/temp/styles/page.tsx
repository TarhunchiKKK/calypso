import { StylesPanel } from "@/features/board-editor/modules/styling";

export default function Page() {
    return (
        <div className="fixed top-1/2 left-1/3">
            <StylesPanel point={{ x: 10, y: 10 }} fontFamily={"fantasy"} />
        </div>
    );
}
