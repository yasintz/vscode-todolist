import * as vscode from "vscode";
import { register } from "./store";
import commands from "../../package-json/commands";
import { TreeTodoItem } from "../../tree-view/todo-item";
import AllTodosProvider from "../../tree-view/all-todos";
import ReactPanel, { TodoListUiData } from "../../react-panel";

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
    const project = context.todolistFiles
      .find(item => item.id === treeItem.todoLine.projectId)
      ?.getTodos();

    if (project) {
      const props: TodoListUiData = {
        project,
        selectedLine: treeItem.todoLine
      };

      ReactPanel.createOrShow(context.vscodeContext, props);
    }
  }
});
//#endregion

register(commands.REFRESH_ALL.command, (ctx, args) => {
  const treeItem: TreeTodoItem | undefined = args[0];
  if (treeItem) {
    ctx.updateTodoListFile(treeItem.todoLine.id);
    AllTodosProvider.create(ctx);
  }
});

//#region createTodo
// register(commands.ADD_TODO_ITEM.command, () => {});
//#endregion
