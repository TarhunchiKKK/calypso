import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Boards, Id } from "@repo/common";

@Injectable()
export class BoardsHttpService {
    private readonly boardsMicroserviceUrl: string;

    public constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
        @Inject(HttpService) private readonly httpService: HttpService
    ) {
        this.boardsMicroserviceUrl = `${this.configService.getOrThrow("BOARDS_MICROSERVICE_URL")}/boards`;
    }

    public create(createBoardDto: Boards.CreateBoardDto) {
        return this.httpService.post(this.boardsMicroserviceUrl, createBoardDto);
    }

    public findAll() {
        return this.httpService.get(this.boardsMicroserviceUrl);
    }

    public update(id: Id, updateBoardDto: Boards.UpdateBoardDto) {
        return this.httpService.patch(`${this.boardsMicroserviceUrl}/${id}`, updateBoardDto);
    }

    public remove(id: Id) {
        return this.httpService.delete(`${this.boardsMicroserviceUrl}/${id}`);
    }
}
