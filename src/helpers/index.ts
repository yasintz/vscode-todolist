import * as vscode from "vscode";
import TodoListFile from "../utils/todolist-file";

export interface TodoContext {
  vscodeContext: vscode.ExtensionContext;
  todolistFiles: TodoListFile[];
}
