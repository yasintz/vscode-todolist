import * as vscode from "vscode";
import { TodoContext } from "../helpers";

interface Req {
  params: any;
  ctx: TodoContext;
}
type Callback = (req: Req, send: (response: any) => void) => void;

const callbacks: Record<string, Callback> = {};
function register(key: string, callback: Callback) {
  callbacks[key] = callback;
}
export default (key: string, req: Req, send: (d: any) => void) =>
  callbacks[key](req, send);

register("log", ({ ctx, params: data }, send) => {
  console.log(data);
  send(true);
});

register("files", ({ params, ctx }, send) => {
  send({ path: ctx.vscodeContext.extensionPath });
});
