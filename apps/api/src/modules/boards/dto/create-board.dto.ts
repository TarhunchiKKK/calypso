import { PickType } from "@nestjs/swagger";
import type z from "zod";
import { BoardApiType } from "../swagger/board.api-type";
import type { CreateBoardDtoSchema } from "../validation/validation.schemas";

export class CreateBoardDto extends PickType(BoardApiType, ["title", "creatorId"] as const) implements z.infer<typeof CreateBoardDtoSchema> {}

export class CreateBoardResponse extends BoardApiType {}
