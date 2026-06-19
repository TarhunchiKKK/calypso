import { HttpExceptionFilter } from "@api/common";
import { AppLogger } from "@api/logs";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { setupSwagger } from "./lib/swagger/swagger.setup";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true
    });

    setupSwagger(app);

    const logger = app.get(AppLogger);
    app.useLogger(logger);
    app.useGlobalFilters(new HttpExceptionFilter(logger));

    app.use(cookieParser());

    const configService = app.get(ConfigService);

    app.enableCors({
        origin: configService.getOrThrow("FRONTEND_URL"),
        credentials: true
    });

    await app.listen(configService.getOrThrow("APP_PORT"));

    Logger.log(`Gateway is running on ${await app.getUrl()}`);
}

void bootstrap();
