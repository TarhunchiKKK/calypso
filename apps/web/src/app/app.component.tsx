import { BindingPoints } from "@/board-editor/modules/arrows-binding/binding-points.component";
import { Providers } from "./providers.component";

export function App() {
    return (
        <Providers>
            {/* <BoardEditorPage /> */}

            <div className="fixed top-1/2 left-1/2 ">
                <div className="w-30 h-30 relative border-2 border-black box-content">
                    <BindingPoints
                        positions={{
                            "en-mid": true,
                            "es-mid": true,
                            "ne-mid": true,
                            "nw-mid": true,
                            "se-mid": true,
                            "sw-mid": true,
                            "wn-mid": true,
                            "ws-mid": true,
                            e: true,
                            n: true,
                            ne: true,
                            nw: true,
                            s: true,
                            sw: true,
                            se: true,
                            w: true
                        }}
                    />
                </div>
            </div>

            {/* <CurrentUi /> */}
        </Providers>
    );
}
