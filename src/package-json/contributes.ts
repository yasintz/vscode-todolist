import commands from "./commands";
import view from "./view";
import { viewTitle, viewItemContext } from "./menus";

const contributes = {
  viewsContainers: {
    activitybar: [
      {
        id: "vs-todo-list",
        title: "Todo List",
        icon: "resources/activity-bar-item.svg"
      }
    ]
  },
  views: {
    "vs-todo-list": [view]
  },
  commands: Object.values(commands),
  menus: {
    "view/title": viewTitle,
    "view/item/context": viewItemContext
  }
};

export default contributes;
