import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Square, Type } from "lucide-react";
import { centered } from "#/common/lib";
import { BorderColorPlaceholder } from "@/board-editor/modules/styling/elements/border/constants";
import { BackgroundColorPlaceholder, TextColorPlaceholder } from "@/board-editor/modules/styling/elements/color/constants";
import { ColorsDropdown } from "@/board-editor/modules/styling/lib/colors-dropdown.component";
import { ColorsDropdownItemSizes } from "@/board-editor/modules/styling/lib/ui.constants";
import { AvailableColors } from "@/entities/nodes/constants/available-node-styles.constants";

const meta = {
    title: "Board Editor/Modules/Styling/UI/ColorsDropdown",
    component: ColorsDropdown
} satisfies Meta<typeof ColorsDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BackgroundColors: Story = {
    args: {
        title: "Background",
        placeholder: BackgroundColorPlaceholder,
        colors: AvailableColors,
        renderItem: backgroundColor => <div className="w-5 h-5 rounded-full" style={{ backgroundColor, ...ColorsDropdownItemSizes }} />,
        onSelect: () => {}
    },
    decorators: centered
};

export const TextColors: Story = {
    args: {
        title: "Text Color",
        placeholder: TextColorPlaceholder,
        colors: AvailableColors,
        renderItem: color => <Type style={{ color, ...ColorsDropdownItemSizes }} />,
        onSelect: () => {}
    },
    decorators: centered
};

export const BorderColors: Story = {
    args: {
        title: "Border Color",
        placeholder: BorderColorPlaceholder,
        colors: AvailableColors,
        renderItem: color => <Square style={{ color, ...ColorsDropdownItemSizes }} />,
        onSelect: () => {}
    },
    decorators: centered
};
