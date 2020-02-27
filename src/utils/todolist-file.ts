import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import noteParse, { Line } from "./note-parse";

class App {
  get filePath() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      throw new Error("Project Root Not Found");
    }
    const projectRoot = workspaceFolders[0].uri.fsPath;
    return path.join(projectRoot, ".vscode", "todolist");
  }

  createTodoFile = async () => {
    this.makeFileSync(this.filePath);
  };
  getTodos = (): Line[] => {
    try {
      const fileContent = fs.readFileSync(this.filePath, "UTF-8");
      return noteParse(fileContent);
    } catch (error) {
      console.log(error);
      return [];
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
      stream.write("{}");
      stream.close();
    }
  }
}

export default App;
