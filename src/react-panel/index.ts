import * as vscode from "vscode";
import { TodoFileLine } from "../utils/note-parse";

export interface TodoListUiData {
  project: TodoFileLine;
  selectedLine: TodoFileLine;
}

class ReactPanel {
  public static currentPanel: ReactPanel | undefined;

  private static readonly viewType = "react";

  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(
    context: vscode.ExtensionContext,
    data: TodoListUiData
  ) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    if (ReactPanel.currentPanel) {
      ReactPanel.currentPanel._panel.reveal(column);
      // TODO: send message for update html to view
      ReactPanel.currentPanel._panel.webview.html = uiHtmlContent(
        context,
        data
      );
    } else {
      ReactPanel.currentPanel = new ReactPanel(
        column || vscode.ViewColumn.One,
        uiHtmlContent(context, data)
      );
    }
  }

  private constructor(column: vscode.ViewColumn, html: string) {
    this._panel = vscode.window.createWebviewPanel(
      ReactPanel.viewType,
      "React",
      column,
      {
        enableScripts: true
      }
    );

    this._panel.webview.html = html;

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    this._panel.webview.onDidReceiveMessage(
      message => {
        switch (message.command) {
          case "alert":
            vscode.window.showErrorMessage(message.text);
            return;
        }
      },
      null,
      this._disposables
    );
  }

  public dispose() {
    ReactPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}

const uiHtmlContent = (
  context: vscode.ExtensionContext,
  data: TodoListUiData
) => `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  </head>
  <body>
      <div id="root"></div>
      <script>
          window.vscode={acquire:acquireVsCodeApi(),data:${JSON.stringify(
            data
          )}};
      </script>
      ${loadScript(context, "out/view_script.js")}
  </body>
  </html>`;

function loadScript(context: vscode.ExtensionContext, path: string) {
  return `<script src="${vscode.Uri.file(context.asAbsolutePath(path))
    .with({ scheme: "vscode-resource" })
    .toString()}"></script>`;
}

export default ReactPanel;
