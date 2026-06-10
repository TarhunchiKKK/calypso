import { MailsService } from "../services/mails.service";
import { MailsServiceDev } from "../services/mails.service.dev";

export function selectMailsService() {
    switch (process.env.NODE_ENV) {
        case "prod":
            return MailsService;
        case "dev":
            return MailsServiceDev;
        default:
            throw new Error(`Unknown env mode "${process.env.NODE_ENV}"`);
    }
}
