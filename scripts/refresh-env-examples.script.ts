import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

type MapItem = {
    source: string;
    destination: string;
    exclude: string[];
};

const map: MapItem[] = [
    {
        source: ".env",
        destination: ".env.example",
        exclude: []
    },
    {
        source: "apps/gateway/.env",
        destination: "apps/gateway/.env.example",
        exclude: []
    },
    {
        source: "apps/boards/.env",
        destination: "apps/boards/.env.example",
        exclude: []
    },
    {
        source: "apps/media/.env",
        destination: "apps/media/.env.example",
        exclude: []
    },
    {
        source: "apps/web/.env",
        destination: "apps/web/.env.example",
        exclude: []
    }
];

for (const { source, destination, exclude } of map) {
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
}
