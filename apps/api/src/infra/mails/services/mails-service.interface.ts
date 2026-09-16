import type { SendMailDto } from "../dto/send-mail.dto";

export interface IMailsService {
    sendMail: (dto: SendMailDto) => void | Promise<void>;
}
