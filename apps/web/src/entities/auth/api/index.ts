import { queryKeys } from "./api.lib";
import { useProfile } from "./profile.api";
import { useSignIn } from "./sign-in.api";
import { useSignOut } from "./sign-out.api";
import { useSignUp } from "./sign-up.api";

export const AuthApi = {
    queryKeys,
    useSignUp,
    useSignIn,
    useSignOut,
    useProfile
};
