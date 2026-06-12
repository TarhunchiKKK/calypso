import { useResetPassword } from "./reset-password.api";
import { useUpdatePassword } from "./update-password.api";

export const PasswordRecoveryApi = {
    useReset: useResetPassword,
    useUpdate: useUpdatePassword
};
