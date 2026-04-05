import type { ProjectWithType } from "@repo/common";
import { Routes } from "@/shared/config";

export const preventDefaultEventHandler = (e: Event) => e.preventDefault();

export const copyProjectLink = (project: ProjectWithType) => {
    const link = Routes.apps[project.type](project.id);

    navigator.clipboard.writeText(`${window.location.origin}/${link}`);
};

export const openInNewTab = (project: ProjectWithType) => {
    const link = Routes.apps[project.type](project.id);

    window.open(`${window.location.origin}/${link}`);
};
