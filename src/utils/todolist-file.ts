import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import noteParse, { TodoFileLine } from "./note-parse";

class TodoListFile {
  private _projectRoot: string;
  private _filePath: string;
  public id: string = "";
  private _project: TodoFileLine | undefined;
  constructor(workspaceFolder: vscode.WorkspaceFolder) {
    this._projectRoot = workspaceFolder.uri.fsPath;
    this._filePath = path.join(this._projectRoot, ".vscode", "todolist");
  }

  createTodoFile = async () => {
    this.makeFileSync(this._filePath);
  };

  clear = () => {
    this._project = undefined;
  };

  getTodos = (): TodoFileLine | undefined => {
    if (!this._project) {
      try {
        const fileContent = fs.readFileSync(this._filePath, "UTF-8");
        this._project = noteParse(
          fileContent,
          this._projectRoot.split(path.sep).pop() as string
        );
        this.id = this._project.id;
      } catch (error) {
        console.log(error);
      }
    }

    return this._project;
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

export default TodoListFile;
