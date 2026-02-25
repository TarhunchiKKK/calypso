export function capitalize(str: string) {
    if (str.length === 0) {
        return 0;
    }

    return str[0].toUpperCase() + str.slice(1).toLocaleLowerCase();
}
