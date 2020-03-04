import commands from "./commands";
import { isTodoView } from "./view";
import { LineType } from "../utils/note-parse";
interface OrmObj {
  or: (str: Orm) => OrmObj;
  and: (str: Orm) => OrmObj;
  toString: () => string;
}
type Orm = OrmObj | string;

const createCondition = (type: LineType) => `viewItem == ${type}`;

const isProject = createCondition(LineType.Project);
const isTodo = createCondition(LineType.Todo);
const isTitle = createCondition(LineType.Title);

const orm = (condition: Orm): OrmObj => ({
  or: str => orm(`${condition} || ${str}`),
  and: str => orm(`${condition} && ${str}`),
  toString: () => condition.toString()
});

const viewTitle = [
  {
    command: commands.REFRESH_ALL.command,
    when: orm(isTodoView)
  }
].map(item => ({
  ...item,
  when: item.when.toString(),
  group: "navigation"
}));

const viewItemContext = [
  {
    command: commands.ADD_TODO_ITEM.command,
    when: orm(isTodoView).and(orm(isProject).or(isTitle))
  },
  {
    command: commands.REFRESH_ALL.command,
    when: orm(isTodoView).and(isProject)
  },
  {
    command: commands.OPEN_TODO_UI.command,
    when: orm(isTodoView).and(isProject)
  },
  {
    command: commands.EDIT_TODO_ITEM.command,
    when: orm(isTodoView).and(isTodo)
  },
  {
    command: commands.DELETE_TODO_ITEM.command,
    when: orm(isTodoView).and(isTodo)
  }
].map(item => ({
  ...item,
  when: item.when.toString(),
  group: "inline"
}));

export { viewTitle, viewItemContext };
