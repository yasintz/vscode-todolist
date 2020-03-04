import * as vscode from "vscode";
import { TreeTodoItem } from "./todo-item";
import { TodoItem } from "../models/note";
import { TodoContext } from "../helpers";
import { Line } from "../utils/note-parse";

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

  private todos: Line[];

  constructor(public readonly ctx: TodoContext) {
    this.todos = ctx.todolistFiles
      .map(item => item.getTodos())
      .filter(item => Boolean(item)) as Line[];
  }

  refresh = (): void => {
    this._onDidChangeTreeData.fire();
  };

  getTreeItem = (element: TreeTodoItem): vscode.TreeItem => {
    return element;
  };

  getChildren = (element?: TreeTodoItem): Thenable<TreeTodoItem[]> => {
    if (element) {
      return Promise.resolve(element.note.lines.map(this.getItem));
    } else {
      return Promise.resolve(this.todos.map(this.getItem));
    }
  };
  getItem = (note: Line): TreeTodoItem => {
    return new TreeTodoItem(note, Boolean(note.lines.length), this.ctx);
  };
}

export default AllTodosProvider;
