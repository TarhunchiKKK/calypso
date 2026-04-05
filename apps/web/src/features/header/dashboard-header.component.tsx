import { Logo, Wrapper } from "@/shared/ui";
import { ThemeSwitch } from "../dark-mode";


export function DashboardHeader() {
    return (
        <header>
            <Wrapper className="container mx-auto flex flex-row justify-between items-center">
                    <Logo />
                    

                    <div className="flex flex-row justify-between items-center">

                        
                        <ThemeSwitch/>
                    </div>
            </Wrapper>
        </header>
    );
}
