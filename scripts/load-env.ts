import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const sourceEnvFile = path.join(rootDir, ".env");

if (!fs.existsSync(sourceEnvFile)) {
    console.error(`Error: Source file not found at ${sourceEnvFile}`);
    process.exit(1);
}

// mapping global `.env` key names to service `.env` key names
const map = {
    gateway: {
        title: "Api Gateway",
        destination: path.join(rootDir, "apps/gateway/.env"),
        variables: {
            APP_PORT: "GATEWAY_SERVICE_APP_PORT",

            COOKIE_HTTP_ONLY: "GATEWAY_SERVICE_COOKIE_HTTP_ONLY",
            COOKIE_SECURE: "GATEWAY_SERVICE_COOKIE_SECURE",
            ACCESS_COOKIE_EXPIRATION: "GATEWAY_SERVICE_ACCESS_COOKIE_EXPIRATION",
            REFRESH_COOKIE_EXPIRATION: "GATEWAY_SERVICE_REFRESH_COOKIE_EXPIRATION",

            SUPABASE_URL: "GATEWAY_SERVICE_SUPABASE_URL",
            SUPABASE_KEY: "GATEWAY_SERVICE_SUPABASE_KEY",

            RMQ_URLS: "RMQ_URLS",

            BOARDS_SERVICE_GRPC_URL: "BOARDS_SERVICE_GRPC_URL",
            BOARDS_SERVICE_URL: "BOARDS_SERVICE_APP_URL",
            BOARDS_SERVICE_RMQ_QUEUE: "BOARDS_SERVICE_RMQ_QUEUE",

            FRONTEND_URL: "WEB_URL"
        }
    },
    boards: {
        title: "Boards Service",
        destination: path.join(rootDir, "apps/boards/.env"),
        variables: {
            APP_PORT: "BOARDS_SERVICE_APP_PORT",
            APP_URL: "BOARDS_SERVICE_APP_URL",

            GRPC_URL: "BOARDS_SERVICE_GRPC_URL",

            SQL_DB_NAME: "BOARDS_SERVICE_SQL_DB_NAME",
            SQL_DB_HOST: "BOARDS_SERVICE_SQL_DB_HOST",
            SQL_DB_PORT: "BOARDS_SERVICE_SQL_DB_PORT",
            SQL_DB_USER: "BOARDS_SERVICE_SQL_DB_USER",
            SQL_DB_PASS: "BOARDS_SERVICE_SQL_DB_PASS",

            NOSQL_DB_NAME: "BOARDS_SERVICE_NOSQL_DB_NAME",
            NOSQL_DB_HOST: "BOARDS_SERVICE_NOSQL_DB_HOST",
            NOSQL_DB_PORT: "BOARDS_SERVICE_NOSQL_DB_PORT",

            RMQ_URLS: "RMQ_URLS",
            RMQ_QUEUE: "BOARDS_SERVICE_RMQ_QUEUE"
        }
    },
    web: {
        title: "Web",
        destination: path.join(rootDir, "apps/web/.env"),
        variables: {
            VITE_APP_URL: "WEB_URL",
            VITE_BOARD_LS_KEY: "WEB_BOARD_LS_KEY",
            VITE_THEME_LS_KEY: "WEB_THEME_LS_KEY",
            VITE_API_URL: "GATEWAY_SERVICE_APP_URL",
            VITE_API_STALE_TIME: "WEB_API_STALE_TIME",
            VITE_API_GC_TIME: "WEB_API_GC_TIME"
        }
    }
};

// Read .env file and create key/value record
const envContent = fs.readFileSync(sourceEnvFile, "utf-8");
const envRecord: Record<string, string> = {};

for (const line of envContent.split("\n")) {
    if (line.includes("=")) {
        const [key, value] = line.split("=");

        if (!key || !value) {
            throw new Error(`Invalid environment variable format: ${key}=${value}`);
        }

        envRecord[key.trim()] = value.trim();
    }
}

// get corresponding variables and write them to corresponding files
for (const { title, destination, variables } of Object.values(map)) {
    let serviceEnvContent = "";

    for (const [serviceKey, envKey] of Object.entries(variables)) {
        const envValue = envRecord[envKey];

        if (!envValue) {
            throw new Error(`Missing environment variable: ${envKey}`);
        }

        serviceEnvContent += `${serviceKey}=${envValue}\n`;
    }

    fs.writeFileSync(destination, serviceEnvContent);

    console.info(`✅ Env file for '${title}' successfully loaded!`);
}
