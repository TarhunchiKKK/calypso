import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.use(cookieParser());

    app.enableCors({
        origin: configService.getOrThrow("FRONTEND_URL"),
        credentials: true
    });

    await app.listen(configService.getOrThrow("APP_PORT"));

    Logger.log(`Gateway is running on ${await app.getUrl()}`);
}

void bootstrap();
