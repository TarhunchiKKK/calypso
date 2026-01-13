import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Header } from "@/features/header";

const meta = {
    title: "Page/Header",
    component: Header
} satisfies Meta<typeof Header>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
