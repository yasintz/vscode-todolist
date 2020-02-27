import * as path from "path";
export const joinReources = (...paths: string[]) =>
  path.join(__dirname, "..", "..", "resources", ...paths);

export const uiHmtlPath = joinReources("ui", "index.html");
