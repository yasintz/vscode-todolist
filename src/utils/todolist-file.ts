import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import noteParse, { Line } from "./note-parse";

class App {
  private _projectRoot: string;
  constructor(workspaceFolder: vscode.WorkspaceFolder) {
    this._projectRoot = workspaceFolder.uri.fsPath;
  }

  get filePath() {
    return path.join(this._projectRoot, ".vscode", "todolist");
  }

  createTodoFile = async () => {
    this.makeFileSync(this.filePath);
  };

  getTodos = (): Line | undefined => {
    try {
      const fileContent = fs.readFileSync(this.filePath, "UTF-8");
      return noteParse(
        fileContent,
        this._projectRoot.split(path.sep).pop() as string
      );
    } catch (error) {
      console.log(error);
    }
  };

  private makeDirSync(dir: string) {
    if (fs.existsSync(dir)) {
      return;
    }
    if (!fs.existsSync(path.dirname(dir))) {
      this.makeDirSync(path.dirname(dir));
    }
    fs.mkdirSync(dir);
  }

  private makeFileSync(filename: string) {
    if (!fs.existsSync(filename)) {
      this.makeDirSync(path.dirname(filename));
      const stream = fs.createWriteStream(filename);
      stream.close();
    }
  }
}

export default App;
