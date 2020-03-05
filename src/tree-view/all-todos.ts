import * as vscode from "vscode";
import { TreeTodoItem } from "./todo-item";
import { TodoContext } from "../helpers";
import { TodoFileLine } from "../utils/note-parse";

class AllTodosProvider implements vscode.TreeDataProvider<TreeTodoItem> {
  static create = (ctx: TodoContext) => {
    vscode.window.registerTreeDataProvider(
      "todolistExtension:view",
      new AllTodosProvider(ctx)
    );
  };
  private _onDidChangeTreeData: vscode.EventEmitter<
    TreeTodoItem | undefined
  > = new vscode.EventEmitter<TreeTodoItem | undefined>();

  readonly onDidChangeTreeData: vscode.Event<TreeTodoItem | undefined> = this
    ._onDidChangeTreeData.event;

  private todos: TodoFileLine[];

  constructor(public readonly ctx: TodoContext) {
    this.todos = ctx.todolistFiles
      .map(item => item.getTodos())
      .filter(item => Boolean(item)) as TodoFileLine[];
  }

  refresh = (): void => {
    this._onDidChangeTreeData.fire();
  };

  getTreeItem = (element: TreeTodoItem): vscode.TreeItem => {
    return element;
  };

  getChildren = (element?: TreeTodoItem): Thenable<TreeTodoItem[]> => {
    if (element) {
      return Promise.resolve(element.todoLine.lines.map(this.getItem));
    } else {
      return Promise.resolve(this.todos.map(this.getItem));
    }
  };
  getItem = (note: TodoFileLine): TreeTodoItem => {
    return new TreeTodoItem(note, Boolean(note.lines.length), this.ctx);
  };
}

export default AllTodosProvider;
