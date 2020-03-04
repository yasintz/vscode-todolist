const view = {
  id: "todolistExtension:view",
  name: "All Todos"
} as const;

export const isTodoView = `view == ${view.id}`;

export default view;
