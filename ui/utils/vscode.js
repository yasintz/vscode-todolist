export function getVsData() {
  return window["vs-data"];
}

export function vscode() {
  return window.vscode;
}
let id = 0;
const calbacks = {};
export function api(key, data) {
  return new Promise((resolve, reject) => {
    vscode().postMessage({ key, id, data });
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
