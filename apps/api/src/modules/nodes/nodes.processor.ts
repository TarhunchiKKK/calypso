import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Inject } from "@nestjs/common";
import type { Job } from "bullmq";
import type { OnlyIdDto } from "src/shared/dto";
import { NODES_QUEUE, type NodesQueueJobs } from "./lib/bullmq.lib";
import { NodesService } from "./nodes.service";

@Processor(NODES_QUEUE)
export class NodesProcessor extends WorkerHost {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {
        super();
    }

    public async process(job: Job<unknown, unknown, NodesQueueJobs>) {
        switch (job.name) {
            case "remove-by-board-id":
                await this.nodesService.removeNodesByBoard((job.data as OnlyIdDto).id);
                break;
            default:
                throw new Error(`[${NodesProcessor.name}] Unknown job: ${job.name}`);
        }
    }
}
