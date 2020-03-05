export enum LineType {
  Title = "vstodolisttitle",
  Todo = "vstodolisttodo",
  Description = "vstodolistdescription",
  Project = "vstodolistproject",
  Undef = "vstodolistundef"
}

export interface TodoFileLine {
  id: string;
  projectId: string;
  text: string;
  depth: number;
  type: LineType;
  lines: TodoFileLine[];
  descriptions: TodoFileLine[];
}
const PREFIXES: Record<LineType, string> = {
  [LineType.Title]: "#",
  [LineType.Todo]: "-",
  [LineType.Description]: "*",
  [LineType.Project]: "$",
  [LineType.Undef]: "&&"
};

function getType(text: string): LineType {
  const val = Object.entries(PREFIXES).find(
    ([key, value]) => value === text.trim()[0]
  );
  if (val) {
    return val[0] as LineType;
  }

  return LineType.Undef;
}

function getDepth(text: string, type: LineType): number {
  return text.split(PREFIXES[type])[0].length / 2;
}

function lineToString(line: TodoFileLine): string {
  const isProject = line.type === LineType.Project;
  const spaceLenght = isProject ? 0 : line.depth * 2;
  const spaces = new Array(spaceLenght).fill(" ").join("");
  const start = `${spaces}${PREFIXES[line.type]}`;
  const lineText = `${start} ${line.text}\n`;
  const descriptions = line.descriptions.map(lineToString).join("\n");
  const childs = line.lines.map(lineToString).join("\n");
  return `${isProject ? "" : lineText}${descriptions}\n${childs}`;
}

let count = 0;
function createLines(todoList: string, projectId: string): TodoFileLine[] {
  return todoList
    .split("\n")
    .filter(line => line.trim())
    .map(text => {
      const type: LineType = getType(text);
      const depth = getDepth(text, type);

      return {
        id: `${text.replace(/\s/g, "")}${count++}`,
        projectId,
        text: text
          .trim()
          .substring(1)
          .trim(),
        type,
        depth,
        lines: [],
        descriptions: []
      };
    })
    .filter(item => item.type !== LineType.Undef);
}

function noteParse(todoList: string, projectName: string) {
  const projectId = `${projectName}${count++}`;
  const project: TodoFileLine = {
    projectId: projectId,
    id: projectId,
    text: projectName,
    depth: -1,
    type: LineType.Project,
    lines: [],
    descriptions: []
  };

  const lines: TodoFileLine[] = createLines(todoList, project.id);
  const lasts: TodoFileLine[] = [project];

  const getLast = () => lasts[lasts.length - 1];
  const pushToChild = (line: TodoFileLine) => {
    const last = getLast();
    if (line.type === LineType.Description) {
      last.descriptions.push(line);
    } else {
      last.lines.push(line);
    }
  };

  function saveItem(line: TodoFileLine) {
    const last = getLast();
    const isParent =
      line.type === LineType.Title || line.type === LineType.Todo;

    const isCorrectParent = line.depth > last.depth;
    const lastIsTitleOrProject =
      last.type === LineType.Title || last.type === LineType.Project;

    if (lastIsTitleOrProject && isCorrectParent) {
      line.depth = last.depth + 1;

      pushToChild(line);

      isParent && lasts.push(line);

      return;
    }

    if (
      last.type === LineType.Todo &&
      line.type === LineType.Description &&
      isCorrectParent
    ) {
      line.depth = last.depth + 1;
      pushToChild(line);

      return;
    }

    lasts.pop();
    saveItem(line);
  }

  lines.forEach(line => saveItem(line));
  project.toString = () => lineToString(project);
  return project;
}

export default noteParse;
