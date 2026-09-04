import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Inject } from "@nestjs/common";
import type { Job } from "bullmq";
import type { SendResetPasswordMailDto } from "./dto/send-reset-password-mail.dto";
import { PASSWORD_RECOVERY_BULLMQ_QUEUE, type PasswordRecoveryQueueJobs } from "./lib/bullmq.lib";
import { PasswordRecoveryService } from "./password-recovery.service";

@Processor(PASSWORD_RECOVERY_BULLMQ_QUEUE)
export class PasswordRecoveryProcessor extends WorkerHost {
    public constructor(@Inject(PasswordRecoveryService) private readonly passwordRecoveryService: PasswordRecoveryService) {
        super();
    }

    public async process(job: Job<unknown, unknown, PasswordRecoveryQueueJobs>) {
        switch (job.name) {
            case "send-mail":
                await this.passwordRecoveryService.sendMail(job.data as SendResetPasswordMailDto);
                break;
            default:
                throw new Error(`[EmailVerificationProcessor] Unknown job: ${job.name}`);
        }
    }
}
