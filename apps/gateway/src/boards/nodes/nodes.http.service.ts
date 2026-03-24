import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Id } from "@repo/common";

@Injectable()
export class NodesHttpService {
    private readonly boardsMicroserviceUrl: string;

    public constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
        @Inject(HttpService) private readonly httpService: HttpService
    ) {
        this.boardsMicroserviceUrl = `${this.configService.getOrThrow("BOARDS_MICROSERVICE_URL")}/nodes`;
    }

    public findAll(boardId: Id) {
        return this.httpService.get(`${this.boardsMicroserviceUrl}/${boardId}`);
    }
}
