import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/shared/config";
import { DropdownMenuItem } from "@/shared/ui/kit";
import { AuthApi } from "../../entities/auth";

export function SignOutDropdownItem() {
    const signOut = AuthApi.useSignOut();

    const navigate = useNavigate();

    const onSelect = async () => {
        await signOut.mutateAsync();

        navigate(Routes.auth.signIn);
    };

    return (
        <DropdownMenuItem variant="destructive" disabled={signOut.isPending} onSelect={onSelect}>
            <LogOutIcon />
            Sign Out
        </DropdownMenuItem>
    );
}
