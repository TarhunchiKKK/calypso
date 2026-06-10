import { Injectable } from "@nestjs/common";
import { IMailsService } from "../interfaces/mails.service.interface";
import { SendMailDto } from "../dto/send-mail.dto";

@Injectable()
export class MailsService implements IMailsService {
    public sendMail(dto: SendMailDto) {}
}
