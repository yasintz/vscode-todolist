import * as vscode from "vscode";
import TodoListFile from "../utils/todolist-file";
import AllTodosProvider from "../tree-view/all-todos";

export interface TodoContext {
  vscodeContext: vscode.ExtensionContext;
  todolistFiles: TodoListFile[];
  updateTodoListFile: (id: string) => void;
}

export interface Api {
  log: {
    params: any;
    response: boolean;
  };

  files: {
    params?: any;
    response: { path: string };
  };
}
