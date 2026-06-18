import * as fs from "node:fs";
import * as path from "node:path";

const rootDir = process.cwd();

const apps = [
    {
        folder: rootDir,
        exclude: []
    },

    {
        folder: path.join(rootDir, "apps/gateway"),
        exclude: []
    },
    {
        folder: path.join(rootDir, "apps/boards"),
        exclude: []
    },
    {
        folder: path.join(rootDir, "apps/media"),
        exclude: []
    },
    {
        folder: path.join(rootDir, "apps/mails"),
        exclude: ["MAIL_HOST", "MAIL_PORT", "MAIL_LOGIN", "MAIL_PASSWORD", "MAIL_KEY"]
    },
    {
        folder: path.join(rootDir, "apps/web"),
        exclude: []
    }
];

for (const { folder, exclude } of apps) {
    const content = fs.readFileSync(path.join(folder, ".env"), "utf-8");

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
            result += `${key}=\n`;
        } else {
            result += `${key}=${value}\n`;
        }
    }

    fs.writeFileSync(path.join(folder, ".env.example"), result);

    console.info(`✅ '${path.join(folder, ".env.example")}' successfully loaded!`);
}
