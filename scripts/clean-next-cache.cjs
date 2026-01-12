/**
 * This script removes the `.next` directory from the project root.
 * The .next directory is a cache created by Next.js.
 * Removing it can be useful for clearing the cache and resolving certain issues.
 */
const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const nextCacheDir = path.join(projectRoot, ".next");

console.log(`Attempting to remove ${nextCacheDir}`);

fs.rm(nextCacheDir, { recursive: true, force: true }, err => {
    if (err) {
        console.error(`Error removing .next directory:`, err);
        return;
    }
    console.log(".next directory removed successfully.");
});
