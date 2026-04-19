import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const source = ".env";
const destination = ".env.example";

const exclude: string[] = [];

const content = fs.readFileSync(path.join(rootDir, source), "utf-8");
let result = "";

for (const line of content.split("\n")) {
    if (!line.includes("=")) {
        result += `${line}\n`;
        continue;
    }

    const [key, value] = line.split("=");

    if (!key || !value) {
        throw new Error(`Invalid environment variable format: ${key}=${value}`);
    }

    if (exclude.includes(key)) {
        result += `${key}\n`;
    } else {
        result += `${key}=${value}\n`;
    }
}

fs.writeFileSync(path.join(rootDir, destination), result);

console.info(`✅ '${destination}' successfully loaded!`);
