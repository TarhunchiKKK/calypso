import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/kit";
import { ProfileAvatar } from "./profile-avatar.component";
import { ProfileSettingsDropdownItem } from "./profile-settings.dropdown-item";
import { SignOutDropdownItem } from "./sign-out.dropdown-item";

export function ProfileDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <ProfileAvatar />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <ProfileSettingsDropdownItem />

                <DropdownMenuSeparator />

                <SignOutDropdownItem />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
