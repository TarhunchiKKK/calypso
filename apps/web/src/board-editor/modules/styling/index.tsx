import type { NodeTypes } from "@repo/boards";
import { Wrapper } from "@/shared/ui";
import { Separator } from "@/shared/ui/kit";
import { NodeStyleKeysMap } from "./constants/node-style-keys.map";
import { NodeStyleRenderersMap } from "./constants/node-style-renderers.map";
import { Lock } from "./elements/lock/components";
import { StylesGroupWrapper } from "./lib/styles-group-wrapper.component";
import type { ElementProps } from "./lib/types";

type Props = ElementProps & {
    type: NodeTypes | null;
};

export function StylesPanel({ type, update }: Props) {
    return (
        <Wrapper className="flex flex-row justify-between items-center gap-4 px-4 py-3 w-min">
            {type &&
                NodeStyleKeysMap[type].map((group) => (
                    <>
                        <StylesGroupWrapper>{group.map((key) => NodeStyleRenderersMap[key](update, key))}</StylesGroupWrapper>

                        <Separator orientation="vertical" className="h-5!" />
                    </>
                ))}

            <StylesGroupWrapper>
                <Lock value={true} update={update} />

                <Lock value={false} update={update} />
            </StylesGroupWrapper>
        </Wrapper>
    );
}
