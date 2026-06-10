import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    await app.init();

    await app.startAllMicroservices();

    Logger.log("Mails worker is running", "Workers");
}

void bootstrap();
