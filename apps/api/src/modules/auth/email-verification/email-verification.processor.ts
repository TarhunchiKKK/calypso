import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Inject } from "@nestjs/common";
import type { Job } from "bullmq";
import type { SendEmailVerificationMailDto } from "./dto/send-email-verification-mail.dto";
import { EmailVerificationService } from "./email-verification.service";
import { EMAIL_VERIFICATION_BULLMQ_QUEUE, type EmailVerificationQueueJobs } from "./lib/bullmq.lib";

@Processor(EMAIL_VERIFICATION_BULLMQ_QUEUE)
export class EmailVerificationProcessor extends WorkerHost {
    public constructor(@Inject(EmailVerificationService) private readonly emailVerificationService: EmailVerificationService) {
        super();
    }

    public async process(job: Job<unknown, unknown, EmailVerificationQueueJobs>) {
        switch (job.name) {
            case "send-mail": {
                await this.emailVerificationService.sendMail(job.data as SendEmailVerificationMailDto);
                break;
            }
            default:
                throw new Error(`[${EmailVerificationProcessor}] Unknown job: ${job.name}`);
        }
    }
}
