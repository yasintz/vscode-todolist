import * as fs from "fs";
import { uiHmtlPath } from "./paths";
export enum UI_PAGE_TYPE {
  TODO_LIST = "TODO_LIST"
}

export interface TodoListUiData {
  page: UI_PAGE_TYPE;
}

export default (data: TodoListUiData) =>
  fs.readFileSync(uiHmtlPath, "utf-8").replace(
    "<!---data--->",
    `
    <script>
      window.vscode=acquireVsCodeApi();
      window["vs-data"] = ${JSON.stringify(data)} 
    </script>
    `
  );
