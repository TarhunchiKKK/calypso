import { PickType } from "@nestjs/swagger";
import type { ReplaceNodeBaseDto as TypeReplaceNodeDto } from "@repo/common";
import { NodeApiType } from "../swagger/node.api-type";

export class Replace extends PickType(NodeApiType, ["id", "boardId", "type", "blocked"] as const) implements TypeReplaceNodeDto {}
