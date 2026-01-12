/**
 * This script removes all '.tsbuildinfo' files from the project root.
 * These files are created by TypeScript during the build process (`tsc`) or executing `bun run type-check`
 * and contain information about the build.
 * Deleting them can help when you want to do a clean rebuild.
 */
const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");

fs.readdir(projectRoot, (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        return;
    }

    files.forEach(file => {
        if (file.endsWith(".tsbuildinfo")) {
            const filePath = path.join(projectRoot, file);

            fs.unlink(filePath, err => {
                if (err) {
                    console.error("Error deleting file:", filePath, err);
                } else {
                    console.log("Deleted file:", filePath);
                }
            });
        }
    });
});
