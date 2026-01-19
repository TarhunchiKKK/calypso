export type Theme = "light" | "dark";

export function setDocumentTheme(theme: Theme) {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
}
