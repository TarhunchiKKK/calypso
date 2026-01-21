import { ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { ToggleGroup } from "@/shared/ui/kit";

export function BlockToggles() {
    return (
        <ToggleGroup type="single" variant="outline">
            <div className="flex flex-row justify-between items-center gap-1">
                <ToggleGroupItem value="lock" className="cursor-pointer">
                    <LockKeyhole />
                </ToggleGroupItem>

                <ToggleGroupItem value="unlock" className="cursor-pointer">
                    <LockKeyholeOpen />
                </ToggleGroupItem>
            </div>
        </ToggleGroup>
    );
}
