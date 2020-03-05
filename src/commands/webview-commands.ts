import { TodoContext, Api } from "../helpers";
// #region Register Utils 

interface Req<T extends keyof Api> {
  params: Api[T]["params"];
  ctx: TodoContext;
}
type Callback<T extends keyof Api> = (
  req: Req<T>,
  send: (response: Api[T]["response"]) => void
) => void;

const callbacks: Record<string, Callback<any>> = {};
function register<T extends keyof Api>(key: T, callback: Callback<T>) {
  callbacks[key] = callback;
}
export default (key: string, req: Req<any>, send: (d: any) => void) => {
  const callback = callbacks[key];
  if (callback) {
    callback(req, send);
  }
};

// #endregion Register Utils 

register("log", ({ ctx, params: data }, send) => {
  console.log({
    info: "from ui",
    data
  });
  send(true);
});

register("files", ({ params, ctx }, send) => {
  send({ path: ctx.vscodeContext.extensionPath });
});
