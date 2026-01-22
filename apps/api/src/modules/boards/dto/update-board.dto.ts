import { PickType } from "@nestjs/swagger";
import type { UpdateBoardDto } from "@repo/common";
import { BoardApiType } from "../swagger/board.api-type";

export class UpdateBoardRequest extends PickType(BoardApiType, ["title"] as const) implements UpdateBoardDto {}
