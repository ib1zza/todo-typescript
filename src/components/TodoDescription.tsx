import React from "react";
import s from "../css/TodoDescription.module.scss";
import { Todo } from "../types";

const TodoDescription: React.FC<{ todo: Todo }> = ({ todo }) => {
  return (
    <div className={s.todo_info}>
      <h2 className={s.todo_title}>{todo.title}</h2>
      <p className={s.todo_description}>{todo.description || null}</p>
    </div>
  );
};

export default TodoDescription;
