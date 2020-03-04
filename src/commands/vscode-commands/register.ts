import * as vscode from "vscode";
import { UI_PAGE_TYPE } from "../../utils/ui-html-content";
import { register } from "./store";
import openWebView from "../../utils/open-webview";
import commands from "../../package-json/commands";
import { TreeTodoItem } from "../../tree-view/todo-item";

//#region createTodoList
register(commands.CREATE_TODO_LIST.command, context => {
  try {
    // context.todolistFiles[0].createTodoFile();
  } catch (error) {
    vscode.window.showInformationMessage(error.message);
  }
});
//#endregion

//#region openWebView
register(commands.OPEN_TODO_UI.command, (context, args) => {
  const treeItem: TreeTodoItem | undefined = args[0];
  if (treeItem) {
    const panel = openWebView(context, {
      page: UI_PAGE_TYPE.TODO_LIST,
      project: treeItem.note
    });
  }
});
//#endregion

//#region createTodo
register(commands.ADD_TODO_ITEM.command, () => {});
//#endregion
