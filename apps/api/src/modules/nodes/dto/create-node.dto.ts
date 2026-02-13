import { OmitType } from "@nestjs/swagger";
import type { NodeBase } from "@repo/common";
import { NodeApiType } from "../swagger/node.api-type";

export class CreateNodeDto extends OmitType(NodeApiType, [] as const) implements NodeBase {}
