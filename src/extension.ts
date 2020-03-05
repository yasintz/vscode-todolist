import "./commands/vscode-commands/register";
import { registerStore } from "./commands/vscode-commands/store";
import * as vscode from "vscode";
import TodoListFile from "./utils/todolist-file";
import TodoListViewItemProvider from "./tree-view/all-todos";
import { TodoContext } from "./helpers";

export function activate(context: vscode.ExtensionContext) {
  const { workspaceFolders } = vscode.workspace;
  if (workspaceFolders) {
    const todolistFiles = workspaceFolders.map(
      workspaceFolderLocation => new TodoListFile(workspaceFolderLocation)
    );
    const todoContext: TodoContext = {
      todolistFiles,
      vscodeContext: context,
      updateTodoListFile: id => {
        const selectedProject = todolistFiles.find(item => item.id === id);
        if (selectedProject) {
          selectedProject.clear();
        }
      }
    };

    registerStore(todoContext);
    TodoListViewItemProvider.create(todoContext);
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
