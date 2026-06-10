import fs from "node:fs";
import path from "node:path";
import { BoardsServiceKeys } from "./boards.constants.js";
import { GatewayKeys } from "./gateway.constants.js";
import { MailsWorkerKeys } from "./mails.constants.js";
import { MediaServiceKeys } from "./media.constants.js";
import { WebKeys } from "./web.constants.js";

const rootDir = process.cwd();
const sourceEnvFile = path.join(rootDir, ".env");

const destinations = [
    {
        path: path.join(rootDir, "apps/gateway/.env"),
        keys: GatewayKeys
    },
    {
        path: path.join(rootDir, "apps/boards/.env"),
        keys: BoardsServiceKeys
    },
    {
        path: path.join(rootDir, "apps/media/.env"),
        keys: MediaServiceKeys
    },
    {
        path: path.join(rootDir, "apps/mails/.env"),
        keys: MailsWorkerKeys
    },
    {
        path: path.join(rootDir, "apps/web/.env"),
        keys: WebKeys
    }
];

if (!fs.existsSync(sourceEnvFile)) {
    console.error(`Error: Source file not found at ${sourceEnvFile}`);
    process.exit(1);
}

const envRecord = readEnv();

loadEnv(envRecord);

function readEnv() {
    const envContent = fs.readFileSync(sourceEnvFile, "utf-8");
    const envRecord: Record<string, string> = {};

    for (const line of envContent.split("\n")) {
        if (line.includes("=")) {
            const [key, value] = line.split("=");

            if (!key || !value) {
                throw new Error(`Invalid environment variable format: ${key}=${value}`);
            }

            envRecord[key] = value;
        }
    }

    return envRecord;
}

function loadEnv(envRecord: Record<string, string>) {
    for (const { path, keys } of destinations) {
        let content = "";

        for (const [key, newKey] of Object.entries(keys)) {
            const value = envRecord[key];

            if (!value) {
                throw new Error(`Key ${key} not provided`);
            }

            content += `${newKey}=${value}\n`;
        }

        fs.writeFileSync(path, content);

        console.info(`✅ '${path}' successfully loaded!`);
    }
}
