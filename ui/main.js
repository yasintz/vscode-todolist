import Default from "./pages/Default.svelte";
import TodoList from "./pages/TodoList.svelte";
import { PAGE_TYPES } from "./utils/constants";
import { getVsData } from "./utils/vscode";
const apps = {
  [PAGE_TYPES.TODO_LIST]: TodoList
};

const App = apps[getVsData().page] || Default;

export default new App({
  target: document.body
});
