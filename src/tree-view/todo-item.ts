import * as vscode from "vscode";
import * as path from "path";
import { TodoContext } from "../helpers";
import { Line } from "../utils/note-parse";

export class TreeTodoItem extends vscode.TreeItem {
  constructor(
    public readonly note: Line,
    public readonly isCollapsed: boolean,
    public readonly ctx: TodoContext
  ) {
    super(
      note.text,
      isCollapsed
        ? vscode.TreeItemCollapsibleState.Collapsed
        : vscode.TreeItemCollapsibleState.None
    );
  }

  get iconPath() {
    return {
      light: path.join(
        this.ctx.vscodeContext.extensionPath,
        "resources",
        "light",
        "dependency.svg"
      ),
      dark: path.join(
        this.ctx.vscodeContext.extensionPath,
        "resources",
        "dark",
        "dependency.svg"
      )
    };
  }

  contextValue = "dependency";
}
