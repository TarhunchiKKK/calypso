import { Header } from "@/features/header";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
    title: "Page/Header",
    component: Header
} satisfies Meta<typeof Header>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
