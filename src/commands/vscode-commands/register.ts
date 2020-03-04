import * as vscode from "vscode";
import { UI_PAGE_TYPE } from "../../utils/ui-html-content";
import { register } from "./store";
import openWebView from "../../utils/open-webview";

//#region createTodoList
register("createTodoList", context => {
  try {
    // context.todolistFiles[0].createTodoFile();
  } catch (error) {
    vscode.window.showInformationMessage(error.message);
  }
});
//#endregion

//#region openWebView
register("openWebView", context => {
  const panel = openWebView(context, { page: UI_PAGE_TYPE.TODO_LIST });
});
//#endregion

//#region createTodo
register("createTodo", () => {});
//#endregion
