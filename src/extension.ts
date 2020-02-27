import "./commands/vscode-commands/register";
import { registerStore } from "./commands/vscode-commands/store";
import * as vscode from "vscode";
import TodoListFile from "./utils/todolist-file";
import TodoListViewItemProvider from "./tree-view/all-todos";
import { TodoContext } from "./helpers";

export function activate(context: vscode.ExtensionContext) {
  const todolistFile = new TodoListFile();
  const todoContext: TodoContext = { todolistFile, vscodeContext: context };

  registerStore(todoContext);
  TodoListViewItemProvider.create(todoContext);
}

// this method is called when your extension is deactivated
export function deactivate() {}
