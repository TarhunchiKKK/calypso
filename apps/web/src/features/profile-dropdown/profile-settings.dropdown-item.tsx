import { User2Icon } from "lucide-react";
import { ProfileSettings } from "@/features/profile-settings";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/kit";

export function ProfileSettingsDropdownItem() {
    return (
        <Dialog>
            <DialogTrigger>
                <User2Icon />
            </DialogTrigger>

            <DialogContent>
                <ProfileSettings />
            </DialogContent>
        </Dialog>
    );
}
