const icon = (name: string) => ({
  light: `resources/light/${name}.svg`,
  dark: `resources/dark/${name}.svg`
});

const commands = {
  CREATE_TODO_LIST: {
    command: "todolistExtension.createTodoList",
    title: "Create todo list file in .vscode directory"
  },
  REFRESH_ALL: {
    command: "todolistExtension.refreshAll",
    title: "Refresh",
    icon: icon("refresh")
  },
  ADD_TODO_ITEM: {
    command: "todolistExtension.addTodoItem",
    title: "Add",
    icon: icon("add")
  },
  EDIT_TODO_ITEM: {
    command: "todolistExtension.editTodoItem",
    title: "Edit",
    icon: icon("edit")
  },
  OPEN_TODO_UI: {
    command: "todolistExtension.openUi",
    title: "Open UI",
    icon: icon("ui")
  },
  DELETE_TODO_ITEM: {
    command: "todolistExtension.deleteTodoItem",
    title: "Delete",
    icon: icon("delete")
  }
} as const;

export default commands;
