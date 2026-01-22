import { PickType } from "@nestjs/swagger";
import type z from "zod";
import { BoardApiType } from "../swagger/board.api-type";
import type { UpdateBoardDtoSchema } from "../validation/validation.schemas";

export class UpdateBoardDto extends PickType(BoardApiType, ["title"] as const) implements z.infer<typeof UpdateBoardDtoSchema> {}
