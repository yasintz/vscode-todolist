import "./assets/app.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { api, vscode } from "./utils/vscode";
import { LineType } from "../utils/note-parse";
import Todo from "./components/todo";
import Header from "./components/header";

const App = () => {
  const { selectedLine, project } = vscode.data;
  if (selectedLine.type === LineType.Todo) {
    return (
      <div>
        <Header project={project} selectedLine={selectedLine} />
        <Todo
          text={selectedLine.text}
          title={"parent title text"}
          descriptions={selectedLine.descriptions.map(desc => ({
            text: desc.text,
            id: desc.text
          }))}
        />
      </div>
    );
  }
  return <h3>Not Supported</h3>;
};

ReactDOM.render(<App />, document.getElementById("root"));
