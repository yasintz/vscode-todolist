import * as React from "react";
interface TodoProps {
  text: string;
  descriptions: { text: string; id: string }[];
  title: string;
}

function Todo(props: TodoProps) {
  return (
    <div>
      <h1>{props.title}</h1>
      <div>{props.text}</div>
      {props.descriptions.map((desc, index) => (
        <span key={desc.id}>{desc.text}</span>
      ))}
    </div>
  );
}

export default Todo;
