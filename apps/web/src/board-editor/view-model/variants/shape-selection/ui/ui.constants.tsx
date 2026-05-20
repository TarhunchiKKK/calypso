import { CircleIcon, Diamond, HexagonIcon, MoveRightIcon, SquareIcon, StarIcon, TriangleIcon } from "lucide-react";
import { BoardHotKeys } from "@/board-editor/lib/hot-keys.lib";
import { switchToNodeCreation } from "../../node-creation/switcher";

const ArrowItems = [
    {
        label: "Arrow",
        icon: <MoveRightIcon />,
        value: switchToNodeCreation({ type: "arrow" }),
        hotKey: BoardHotKeys.switch.toCreation.arrow
    }
] as const;

const ShapeItems = [
    {
        label: "Rectangle",
        icon: <SquareIcon />,
        value: switchToNodeCreation({ type: "shape", variant: "rectangle" }),
        hotKey: BoardHotKeys.switch.toCreation.shape.rectangle
    },
    {
        label: "Circle",
        icon: <CircleIcon />,
        value: switchToNodeCreation({ type: "shape", variant: "circle" }),
        hotKey: BoardHotKeys.switch.toCreation.shape.circle
    },
    {
        label: "Triangle",
        icon: <TriangleIcon />,
        value: switchToNodeCreation({ type: "shape", variant: "triangle" }),
        hotKey: null
    },
    {
        label: "Diamond",
        icon: <Diamond />,
        value: switchToNodeCreation({ type: "shape", variant: "diamond" }),
        hotKey: null
    },
    {
        label: "Star",
        icon: <StarIcon />,
        value: switchToNodeCreation({ type: "shape", variant: "star" }),
        hotKey: null
    },
    {
        label: "Hexagon",
        icon: <HexagonIcon />,
        value: switchToNodeCreation({ type: "shape", variant: "hexagon" }),
        hotKey: BoardHotKeys.switch.toCreation.shape.hexagon
    }
] as const;

export const Items = [ArrowItems, ShapeItems];
