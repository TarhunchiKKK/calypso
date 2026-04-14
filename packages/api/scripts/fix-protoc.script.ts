// scripts/fix-protoc.ts
import * as fs from "fs";
import * as path from "path";

const generatedDir = path.resolve(__dirname, "../src/grpc/generated");

function fixProtobufPackage(filePath: string): void {
    try {
        let content = fs.readFileSync(filePath, "utf8");

        // Удаляем export из строки protobufPackage
        content = content.replace(/^export const protobufPackage = /gm, "const protobufPackage = ");
        content = content.replace(/^export const GOOGLE_PROTOBUF_PACKAGE_NAME = /gm, "const GOOGLE_PROTOBUF_PACKAGE_NAME = ");

        // export const GOOGLE_PROTOBUF_PACKAGE_NAME
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`✅ Fixed protobufPackage in ${path.basename(filePath)}`);
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}:`, error);
    }
}

function processDirectory(dir: string): void {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
            fixProtobufPackage(filePath);
        }
    }
}

processDirectory(generatedDir);
console.log("🎉 All files processed!");
