import contributes from "./contributes";
import * as fs from "fs";
import * as path from "path";
const packageJson = require("../../package.json");

packageJson.contributes = contributes;

fs.writeFileSync(
  path.join(process.cwd(), "package.json"),
  JSON.stringify(packageJson, null, 2)
);
