import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const appPort = Number(process.env.APP_PORT ?? 3000);

    app.use(cookieParser());

    app.enableCors();

    await app.listen(appPort);

    Logger.log(`Gateway is running on ${await app.getUrl()}`);
}

void bootstrap();
