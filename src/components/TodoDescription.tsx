import React from "react";
import s from "../css/TodoDescription.module.scss";

import { Todo, TodoCompleted } from "../types";

const TodoDescription = ({ todo }: { todo: Todo | TodoCompleted }) => {
  return (
    <div className={s.todo_info}>
      <h2 className={s.todo_title}>{todo.title}</h2>
      <p className={s.todo_description}>{todo.description || null}</p>
    </div>
  );
};

export default TodoDescription;
