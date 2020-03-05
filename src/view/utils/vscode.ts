import { Api } from "../../helpers";
import { TodoListUiData } from "../../react-panel";

interface VSCODE {
  acquire: {
    postMessage: (value: any) => void;
  };
  data: TodoListUiData;
}

// @ts-ignore
export const vscode: VSCODE = window.vscode;

let id = 0;
const calbacks: any = {};
export function api<T extends keyof Api>(key: T, data?: Api[T]["params"]) {
  return new Promise<Api[T]["response"]>((resolve, reject) => {
    vscode.acquire.postMessage({ key, id, data });
    calbacks[id] = resolve;
    id++;
  });
}

window.addEventListener("message", ({ data: { data, senderId } }) => {
  if (calbacks[senderId]) {
    calbacks[senderId](data);
    delete calbacks[senderId];
  }
});
