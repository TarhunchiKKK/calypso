const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(date: Date): string {
    const now = new Date();
    const input = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffDays = Math.round((input.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return "Today";
    }

    if (diffDays === 1) {
        return "Yesterday";
    }

    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    if (date.getFullYear() === now.getFullYear()) {
        return `${month} ${day}`;
    }

    return `${month} ${day}, ${date.getFullYear()}`;
}
