import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const sourceEnvFile = path.join(rootDir, ".env");

if (!fs.existsSync(sourceEnvFile)) {
    console.error(`Error: Source file not found at ${sourceEnvFile}`);
    process.exit(1);
}

const envContent: string = fs.readFileSync(sourceEnvFile, "utf-8");

const destinations = [
    path.join(rootDir, "apps/gateway/.env"),
    path.join(rootDir, "apps/boards/.env"),
    path.join(rootDir, "apps/web/.env")
];

for (const destination of destinations) {
    fs.writeFileSync(destination, envContent);
}
