export class DebugException extends Error {
    public constructor(message: string) {
        super(`Debug Exception: ${message}`);
    }
}
