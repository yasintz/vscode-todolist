import * as vscode from "vscode";
import webviewCommands from "../commands/webview-commands";
import uiHtmlContent, { TodoListUiData } from "./ui-html-content";
import { TodoContext } from "../helpers";

function openWebView(context: TodoContext, props: TodoListUiData) {
  const panel = vscode.window.createWebviewPanel(
    "todoList",
    "Todo List",
    vscode.ViewColumn.One,
    {
      enableScripts: true
    }
  );

  panel.webview.html = uiHtmlContent(props);
  panel.webview.onDidReceiveMessage(
    message =>
      webviewCommands(
        message.key,
        { ctx: context, params: message.data },
        data => panel.webview.postMessage({ senderId: message.id, data })
      ),
    undefined,
    context.vscodeContext.subscriptions
  );
  return panel;
}

export default openWebView;
