import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const sourceEnvFile = path.join(rootDir, ".env");
const destinationFile = path.join(rootDir, ".env.example");

if (!fs.existsSync(sourceEnvFile)) {
    console.error(`Error: Source file not found at ${sourceEnvFile}`);
    process.exit(1);
}

// load environment variables to example environment variables file
const envContent: string = fs.readFileSync(sourceEnvFile, "utf-8");

const envKeys = envContent.split("\n").map(line => {
    if (line.includes("=")) {
        return `${line.split("=")[0]}=`;
    } else {
        return line;
    }
});

const exampleEnvContent = envKeys.join("\n");
fs.writeFileSync(destinationFile, exampleEnvContent);
