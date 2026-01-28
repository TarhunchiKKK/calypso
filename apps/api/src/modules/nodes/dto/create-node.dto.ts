import { PickType } from "@nestjs/swagger";
import type { CreateNodeBaseDto as TypeCreateNodeDto } from "@repo/common";
import { NodeApiType } from "../swagger/node.api-type";

export class CreateNodeDto extends PickType(NodeApiType, ["id", "boardId", "type", "blocked"] as const) implements TypeCreateNodeDto {}
