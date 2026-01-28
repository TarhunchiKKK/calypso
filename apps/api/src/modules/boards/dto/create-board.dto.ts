import { PickType } from "@nestjs/swagger";
import type { CreateBoardDto as TypeCreateBoardDto } from "@repo/common";
import { BoardApiType } from "../swagger/board.api-type";

export class CreateBoardDto extends PickType(BoardApiType, ["title", "creatorId"] as const) implements TypeCreateBoardDto {}

export class CreateBoardResponse extends BoardApiType {}
