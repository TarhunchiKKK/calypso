import { mswAuthHandlers } from "./auth.handlers";
import { mswMediaHandlers } from "./media.handlers";

export const MswHandlers = {
    auth: mswAuthHandlers,
    media: mswMediaHandlers
};
