import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppHeader } from "@/features/header";

const meta = {
    title: "Page/App Header",
    component: AppHeader
} satisfies Meta<typeof AppHeader>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
