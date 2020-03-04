import * as vscode from "vscode";
import { TodoContext } from "../../helpers";

type Callback = (ctx: TodoContext, args: any[]) => any;
const store: Record<string, Callback> = {};

export const register = (command: string, callback: Callback) => {
  store[command] = callback;
};

export const registerStore = (context: TodoContext) => {
  Object.keys(store).forEach(key => {
    context.vscodeContext.subscriptions.push(
      vscode.commands.registerCommand(key, (...args) => {
        store[key](context, args);
      })
    );
  });
};
