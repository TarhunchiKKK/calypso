import { Logo, Wrapper } from "@/shared/ui";
import { ThemeSwitch } from "../dark-mode";
import { ProfileDropdown } from "../profile-dropdown";

export function DashboardHeader() {
    return (
        <header className="pt-3">
            <Wrapper className="container mx-auto flex flex-row justify-between items-center px-3">
                <Logo />

                <div className="flex flex-row justify-between items-center gap-4">
                    <ProfileDropdown />

                    <ThemeSwitch />
                </div>
            </Wrapper>
        </header>
    );
}
