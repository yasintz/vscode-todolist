import * as React from "react";
import styled from "styled-components";

interface TodoProps {
  text: string;
  descriptions: { text: string; id: string }[];
  title: string;
}

const StyledDescriptionLi = styled.li`
  font-size: 36px;
  display: block;
`;

function Todo(props: TodoProps) {
  return (
    <div>
      {/* <h1>{props.title}</h1> */}
      <h1>{props.text}</h1>
      {props.descriptions.length > 0 && <div>---- Descriptions ----</div>}
      <ul>
        {props.descriptions.map((desc, index) => (
          <StyledDescriptionLi key={desc.id}>{desc.text}</StyledDescriptionLi>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
