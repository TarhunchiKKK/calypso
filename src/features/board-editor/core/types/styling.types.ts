import type { CSSProperties } from "react";

export type NodeStyles = Partial<{
    fontSize: CSSProperties["fontSize"];
    fontStyle: CSSProperties["fontStyle"];
    backgroundColor: CSSProperties["backgroundColor"];
    textAlign: CSSProperties["textAlign"];
    color: CSSProperties["color"];
    borderColor: CSSProperties["borderColor"];
    borderStyle: CSSProperties["borderStyle"];
    borderRadius: CSSProperties["borderRadius"];
    borderWidth: CSSProperties["borderWidth"];
}>;
