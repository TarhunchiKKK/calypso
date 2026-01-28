import { PickType } from "@nestjs/swagger";
import type { UpdateBoardDto as TypeUpdateBoardDto } from "@repo/common";
import { BoardApiType } from "../swagger/board.api-type";

export class UpdateBoardDto extends PickType(BoardApiType, ["title"] as const) implements TypeUpdateBoardDto {}
