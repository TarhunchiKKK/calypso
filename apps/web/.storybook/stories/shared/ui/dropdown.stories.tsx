import type { Meta, StoryObj } from "@storybook/react-vite";
import { MenuIcon } from "lucide-react";
import { centered } from "#/lib/decorators";
import { Dropdown } from "@/shared/ui";

const meta = {
    title: "Shared/UI/Dropdown",
    component: Dropdown
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Title",
        placeholder: <MenuIcon />,
        items: [
            {
                label: "Item 1",
                value: 1
            },
            {
                label: "Item 2",
                value: 2
            },
            {
                label: "Item 3",
                value: 3
            },
            {
                label: "Item 4",
                value: 4
            },
            {
                label: "Item 5",
                value: 5
            }
        ],
        onSelect: () => {}
    },
    decorators: centered
};
