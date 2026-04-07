import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/kit";
import { ProfileAvatar } from "./profile-avatar.component";
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
                <SignOutDropdownItem />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
