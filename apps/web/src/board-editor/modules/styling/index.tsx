import type { NodeTypes } from "@repo/boards-common";
import { Wrapper } from "@/shared/ui";
import { getNodeSpecificStyles } from "./compose.ui";
import { Lock } from "./elements/lock/components";
import { StylesGroupWrapper } from "./lib/styles-group-wrapper.component";
import type { ElementProps } from "./lib/types";

type Props = ElementProps & {
    type: NodeTypes | null;
};

export function StylesPanel({ type, update }: Props) {
    const renderSpecificStyles = getNodeSpecificStyles(type);

    return (
        <Wrapper className="flex flex-row justify-between items-center gap-4 px-4 py-3 w-min">
            {renderSpecificStyles(update)}

            <StylesGroupWrapper>
                <Lock value={true} update={update} />

                <Lock value={false} update={update} />
            </StylesGroupWrapper>
        </Wrapper>
    );
}
