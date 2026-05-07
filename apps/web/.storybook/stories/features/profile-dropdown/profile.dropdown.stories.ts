import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { ProfileDropdown } from "@/features/profile-dropdown";
import { MswHandlers } from "%/api";

const meta = {
    title: "Features/Profile Dropdown",
    component: ProfileDropdown
} satisfies Meta<typeof ProfileDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered,
    parameters: {
        msw: {
            handlers: [MswHandlers.auth.profile]
        }
    }
};
