const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const nextDir = path.join(projectRoot, ".next");
const lockFile = path.join(nextDir, "lock");

try {
  if (fs.existsSync(lockFile)) {
    fs.rmSync(lockFile, { force: true });
    // eslint-disable-next-line no-console
    console.log("Removed stale .next lock file.");
  }
} catch (error) {
  // eslint-disable-next-line no-console
  console.warn("Unable to remove .next lock file:", error?.message || error);
}
