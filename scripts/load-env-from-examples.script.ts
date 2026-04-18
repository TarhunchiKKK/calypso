import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

type MapItem = {
    source: string;
    destination: string;
};

const map: MapItem[] = [
    {
        source: ".env.example",
        destination: ".env"
    },
    {
        source: "apps/gateway/.env.example",
        destination: "apps/gateway/.env"
    },
    {
        source: "apps/boards/.env.example",
        destination: "apps/boards/.env"
    },
    {
        source: "apps/media/.env.example",
        destination: "apps/media/.env"
    },
    {
        source: "apps/web/.env.example",
        destination: "apps/web/.env"
    }
];

for (const { source, destination } of map) {
    const content = fs.readFileSync(path.join(rootDir, source), "utf-8");

    fs.writeFileSync(path.join(rootDir, destination), content);

    console.info(`✅ '${destination}' successfully loaded!`);
}
