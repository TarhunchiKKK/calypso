// NOTE: This script is designed to copy environment variables to corresponding folders

import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const sourceEnvFile = path.join(rootDir, ".env");

const destinations = {
    apps: [
        {
            folder: path.join(rootDir, "apps", "api"),
            filename: ".env"
        },
        {
            folder: path.join(rootDir, "apps", "web"),
            filename: ".env"
        }
    ],
    example: {
        folder: rootDir,
        filename: ".env.example"
    }
};

if (!fs.existsSync(sourceEnvFile)) {
    console.error(`Error: Source file not found at ${sourceEnvFile}`);
    process.exit(1);
}

// load environment variables to server and client apps
for (const destination of destinations.apps) {
    if (!fs.existsSync(destination.folder)) {
        console.log(`Directory not exists: ${destination.folder}`);
        continue;
    }

    const destinationFile = path.join(destination.folder, destination.filename);
    fs.copyFileSync(sourceEnvFile, destinationFile);
}

// load environment variables to example environment variables file
const envContent: string = fs.readFileSync(sourceEnvFile, "utf-8");
const envKeys = envContent.split("\n").map(line => {
    if (line.includes("=")) {
        return line.split("=")[0] + "=";
    } else {
        return line;
    }
});

const exampleEnvContent = envKeys.join("\n");
fs.writeFileSync(path.join(destinations.example.folder, destinations.example.filename), exampleEnvContent);