import { BadRequestException, type HttpException, HttpStatus, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { map, pipe } from "rxjs";
import type { GrpcResponse } from "../types";

const exceptionsMap: Map<HttpStatus, new (_: string | string[]) => HttpException> = new Map([
    [HttpStatus.BAD_REQUEST, BadRequestException],
    [HttpStatus.NOT_FOUND, NotFoundException],
    [HttpStatus.UNAUTHORIZED, UnauthorizedException],
    [HttpStatus.INTERNAL_SERVER_ERROR, InternalServerErrorException]
]);

export const extractGrpcResponsePipe = <T>() =>
    pipe(
        map((res: GrpcResponse<T>) => {
            if (res.error) {
                const ExceptionConstructor = exceptionsMap[res.error.statusCode] ?? InternalServerErrorException;
                throw new ExceptionConstructor(res.error.message);
            }

            return res.data as T;
        })
    );
