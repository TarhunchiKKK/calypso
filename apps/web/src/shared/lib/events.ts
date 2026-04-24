export function preventDefaultHandler(e: Pick<Event, "preventDefault">) {
    e.preventDefault();
}

export function stopPropagationHandler(e: Pick<Event, "stopPropagation">) {
    e.stopPropagation();
}
