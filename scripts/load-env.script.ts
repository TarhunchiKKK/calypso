import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const sourceEnvFile = path.join(rootDir, ".env");

if (!fs.existsSync(sourceEnvFile)) {
    console.error(`Error: Source file not found at ${sourceEnvFile}`);
    process.exit(1);
}

type Apps = "gateway" | "boards" | "media" | "web";

const renamingMap: Record<string, Partial<Record<Apps, string>>> = {
    // Gateway
    GATEWAY_SERVICE_APP_URL: {
        web: "VITE_API_URL"
    },
    GATEWAY_SERVICE_APP_PORT: {
        gateway: "APP_PORT"
    },

    JWT_SECRET: {
        gateway: "JWT_SECRET"
    },
    ACCESS_JWT_EXPIRATION: {
        gateway: "ACCESS_JWT_EXPIRATION"
    },
    REFRESH_JWT_EXPIRATION: {
        gateway: "REFRESH_JWT_EXPIRATION"
    },

    // // Cookie
    COOKIE_HTTP_ONLY: {
        gateway: "COOKIE_HTTP_ONLY"
    },
    COOKIE_SECURE: {
        gateway: "COOKIE_SECURE"
    },
    ACCESS_COOKIE_EXPIRATION: {
        gateway: "ACCESS_COOKIE_EXPIRATION"
    },
    REFRESH_COOKIE_EXPIRATION: {
        gateway: "REFRESH_COOKIE_EXPIRATION"
    },

    // // Postgres
    GATEWAY_SERVICE_SQL_DB_NAME: {
        gateway: "SQL_DB_NAME"
    },
    GATEWAY_SERVICE_SQL_DB_HOST: {
        gateway: "SQL_DB_HOST"
    },
    GATEWAY_SERVICE_SQL_DB_PORT: {
        gateway: "SQL_DB_PORT"
    },
    GATEWAY_SERVICE_SQL_DB_USER: {
        gateway: "SQL_DB_USER"
    },
    GATEWAY_SERVICE_SQL_DB_PASS: {
        gateway: "SQL_DB_PASS"
    },

    // Boards Service
    BOARDS_SERVICE_GRPC_URL: {
        gateway: "BOARDS_SERVICE_GRPC_URL",
        boards: "GRPC_URL"
    },

    // // Postgres
    BOARDS_SERVICE_SQL_DB_NAME: {
        boards: "SQL_DB_NAME"
    },
    BOARDS_SERVICE_SQL_DB_HOST: {
        boards: "SQL_DB_HOST"
    },
    BOARDS_SERVICE_SQL_DB_PORT: {
        boards: "SQL_DB_PORT"
    },
    BOARDS_SERVICE_SQL_DB_USER: {
        boards: "SQL_DB_USER"
    },
    BOARDS_SERVICE_SQL_DB_PASS: {
        boards: "SQL_DB_PASS"
    },

    // // MongoDB
    BOARDS_SERVICE_NOSQL_DB_NAME: {
        boards: "NOSQL_DB_NAME"
    },
    BOARDS_SERVICE_NOSQL_DB_HOST: {
        boards: "NOSQL_DB_HOST"
    },
    BOARDS_SERVICE_NOSQL_DB_PORT: {
        boards: "NOSQL_DB_PORT"
    },

    // // RabbitMQ
    BOARDS_SERVICE_RMQ_QUEUE: {
        gateway: "BOARDS_SERVICE_RMQ_QUEUE",
        boards: "RMQ_QUEUE"
    },

    // Media Service
    MEDIA_SERVICE_GRPC_URL: {
        gateway: "MEDIA_SERVICE_GRPC_URL",
        media: "GRPC_URL"
    },

    // // Assets
    ASSETS_DIRECTORY: {
        media: "ASSETS_DIRECTORY"
    },

    // // Postgres
    MEDIA_SERVICE_SQL_DB_NAME: {
        media: "SQL_DB_NAME"
    },
    MEDIA_SERVICE_SQL_DB_HOST: {
        media: "SQL_DB_HOST"
    },
    MEDIA_SERVICE_SQL_DB_PORT: {
        media: "SQL_DB_PORT"
    },
    MEDIA_SERVICE_SQL_DB_USER: {
        media: "SQL_DB_USER"
    },
    MEDIA_SERVICE_SQL_DB_PASS: {
        media: "SQL_DB_PASS"
    },

    // Infrastructure

    // // RabbitMQ
    RMQ_URLS: {
        gateway: "RMQ_URLS",
        boards: "RMQ_URLS"
    },
    RMQ_PORT: {},
    RMQ_MANAGEMENT_PORT: {},

    // // S3
    S3_USER: {},
    S3_PASS: {},
    S3_REGION: {
        media: "S3_REGION"
    },
    S3_ENDPOINT: {
        media: "S3_ENDPOINT"
    },
    S3_BUCKET: {
        media: "S3_BUCKET"
    },
    S3_PORT: {},
    S3_UI_PORT: {},
    S3_ACCESS_KEY: {
        media: "S3_ACCESS_KEY"
    },
    S3_SECRET_KEY: {
        media: "S3_SECRETE_KEY"
    },
    S3_URL_EXPIRATION: {
        media: "S3_URL_EXPIRATION"
    },

    // Web
    WEB_URL: {
        gateway: "FRONTEND_URL",
        web: "VITE_APP_URL"
    },

    // // Tanstack Query
    WEB_API_STALE_TIME: {
        web: "VITE_API_STALE_TIME"
    },
    WEB_API_GC_TIME: {
        web: "VITE_S3_REGION"
    },

    // // LocalStorage
    WEB_BOARD_LS_KEY: {},
    WEB_THEME_LS_KEY: {
        web: "VITE_THEME_LS_KEY"
    }
};

// Read .env file and create key/value record

const envContent = fs.readFileSync(sourceEnvFile, "utf-8");

const contentsMap: Record<Apps, string> = {
    gateway: "",
    boards: "",
    media: "",
    web: ""
};

for (const line of envContent.split("\n")) {
    if (line.includes("=")) {
        const [key, value] = line.split("=");

        if (!key || !value) {
            throw new Error(`Invalid environment variable format: ${key}=${value}`);
        }

        const renamingRecord = renamingMap[key];

        if (!renamingRecord) {
            throw new Error(`No renaming instructions for variable ${key}`);
        }

        for (const [app, newName] of Object.entries(renamingRecord)) {
            contentsMap[app as Apps] += `${newName}=${value.trim()}\n`;
        }
    }
}

// Get corresponding variables and write them to corresponding files

const destinationsMap: Record<Apps, string> = {
    gateway: path.join(rootDir, "apps/gateway/.env"),
    boards: path.join(rootDir, "apps/boards/.env"),
    media: path.join(rootDir, "apps/media/.env"),
    web: path.join(rootDir, "apps/web/.env")
};

for (const [app, destination] of Object.entries(destinationsMap)) {
    fs.writeFileSync(destination, contentsMap[app as Apps]);

    console.info(`✅ Env file for '${app}' successfully loaded!`);
}
