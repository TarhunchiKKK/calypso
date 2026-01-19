export type Theme = "light" | "dark";

export const defaultTheme: Theme = "dark";

export function setDocumentTheme(theme: Theme) {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
}
