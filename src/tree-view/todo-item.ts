import * as vscode from "vscode";
import * as path from "path";
import { TodoContext } from "../helpers";
import { TodoFileLine, LineType } from "../utils/note-parse";
const ICON_MAP: Record<LineType, string> = {
  [LineType.Project]: "project",
  [LineType.Title]: "title",
  [LineType.Todo]: "todo",
  [LineType.Description]: "",
  [LineType.Undef]: ""
};
const icon = (extensionPath: string, name: string) => ({
  light: path.join(extensionPath, "resources", "light", `${name}.svg`),
  dark: path.join(extensionPath, "resources", "dark", `${name}.svg`)
});

export class TreeTodoItem extends vscode.TreeItem {
  constructor(
    public readonly todoLine: TodoFileLine,
    public readonly isCollapsed: boolean,
    private readonly ctx: TodoContext
  ) {
    super(
      todoLine.text,
      isCollapsed
        ? vscode.TreeItemCollapsibleState.Collapsed
        : vscode.TreeItemCollapsibleState.None
    );

    this.contextValue = todoLine.type;
  }

  get iconPath() {
    return icon(this.ctx.vscodeContext.extensionPath, ICON_MAP[this.todoLine.type]);
  }
}
