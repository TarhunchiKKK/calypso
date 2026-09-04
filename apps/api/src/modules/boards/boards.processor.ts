import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Inject } from "@nestjs/common";
import type { Job } from "bullmq";
import type { OnlyIdDto } from "src/shared/dto";
import { BoardsService } from "./boards.service";
import { BOARDS_QUEUE, type BoardsQueueJobs } from "./lib/bullmq.lib";

@Processor(BOARDS_QUEUE)
export class BoardsProcessor extends WorkerHost {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {
        super();
    }

    public async process(job: Job<unknown, unknown, BoardsQueueJobs>) {
        switch (job.name) {
            case "update-date":
                await this.boardsService.changeBoardUpdateDate((job.data as OnlyIdDto).id);
                break;
            case "remove-access-rights":
                await this.boardsService.removeBoardAccessRights((job.data as OnlyIdDto).id);
                break;
            default:
                throw new Error(`[${BoardsProcessor.name}] Unknown job: ${job.name}`);
        }
    }
}
