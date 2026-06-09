import type { Board, CreateBoardDto, UpdateBoardDto } from "@lib/boards";
import { PartialType, PickType } from "@nestjs/swagger";
import { BoardApiType } from "./entities.swagger";

export class CreateBoardDtoApiType extends PickType(BoardApiType, ["title", "icon"]) implements CreateBoardDto {}

export class CreateBoardResponseApiType extends BoardApiType implements Board {}

export class UpdateBoardDtoApiType extends PartialType(PickType(BoardApiType, ["title", "description", "icon"])) implements UpdateBoardDto {}
