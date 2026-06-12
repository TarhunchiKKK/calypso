import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/shared/config";
import { DropdownMenuItem } from "@/shared/ui/kit";
import { AuthApi } from "../../entities/auth";

export function SignOutDropdownItem() {
    const navigate = useNavigate();

    const signOut = AuthApi.useSignOut({
        onSuccess: () => {
            navigate(Routes.auth.signIn);
        },
    });

    const onSelect = async () => {
        await signOut.mutateAsync();
    };

    return (
        <DropdownMenuItem
            variant="destructive"
            disabled={signOut.isPending}
            onSelect={onSelect}
        >
            <LogOutIcon />
            Sign Out
        </DropdownMenuItem>
    );
}
