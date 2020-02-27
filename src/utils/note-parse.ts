export enum LineType {
  Title,
  Todo,
  Undef
}

export interface Line {
  index: number;
  text: string;
  depth: number;
  type: LineType;
  childs: Line[];
}

function isTitle(text: string) {
  return text.trim()[0] === "#";
}

function isTodo(text: string) {
  return text.trim()[0] === "-";
}

function getDepth(text: string, type: LineType): number {
  if (type === LineType.Title) {
    return text.split("#")[0].length / 2;
  } else if (type === LineType.Todo) {
    return text.split("-")[0].length / 2;
  }
  return 0;
}

function lineToString(line: Line): string {
  const spaces = new Array(line.depth * 2).fill(" ").join("");
  if (line.type === LineType.Todo) {
    return `${spaces}- ${line.text}\n`;
  }
  return `${spaces}# ${line.text}\n${line.childs.map(lineToString).join("")}`;
}

function createLines(todoList: string) {
  return todoList
    .split("\n")
    .filter(line => line.trim())
    .map((text, index) => {
      const type: LineType = isTitle(text)
        ? LineType.Title
        : isTodo(text)
        ? LineType.Todo
        : LineType.Undef;
      const depth = getDepth(text, type);

      return {
        index,
        text: text
          .trim()
          .substring(1)
          .trim(),
        type,
        depth,
        childs: []
      };
    });
}

function noteParse(todoList: string) {
  const lines: Line[] = createLines(todoList);

  const mains: Line[] = [];

  const parents: Line[] = [];
  const lastParent = () => parents[parents.length - 1];

  function saveItem(line: Line) {
    if (line.depth === 0) {
      mains.push(line);
    } else {
      const lp = lastParent();

      if (line.depth > lp.depth) {
        lp.childs.push(line);
      } else if (line.depth === lp.depth) {
        parents.pop();
        const prev = lastParent();
        if (prev) {
          prev.childs.push(line);
        }
      } else {
        parents.pop();
        saveItem(line);
      }
    }
    if (line.type === LineType.Title) {
      parents.push(line);
    }
  }

  lines.forEach(line => saveItem(line));

  mains.toString = () => mains.map(lineToString).join("");
  return mains;
}

export default noteParse;
