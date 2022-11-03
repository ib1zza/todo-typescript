import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import s from "../css/TodoItem.module.css";
import Button from "../UI/Button";
import { deleteCompletedTodo, deleteTodo } from "../store/reducers/TodoSlice";
import { Todo, TodoCompleted } from "../types";

interface TodoItemCompletedProps {
  todo: Todo;
}

const TodoItemCompleted: React.FC<TodoItemCompletedProps> = ({ todo }) => {
  const dispatch = useAppDispatch();

  let wrapperClasses = s.todoContainer;

  switch (todo.priority) {
    case 1:
      wrapperClasses += " " + s.p1;
      break;
    case 2:
      wrapperClasses += " " + s.p2;
      break;
    case 3:
      wrapperClasses += " " + s.p3;
      break;
    case 4:
      wrapperClasses += " " + s.p4;
      break;
  }

  return (
    <div className={wrapperClasses}>
      <div className={s.todoDescription}>
        <div>
          <h2>{todo.title}</h2>
          <p>{todo.description || null}</p>
        </div>
      </div>
      <span className={s.timeBlock}>
        {todo.dateOfCreation.slice(5, 10) +
          " " +
          todo.dateOfCreation.slice(11, 19)}
      </span>
      <span className={s.timeBlock}>
        {todo.dateOfCompletion !== undefined
          ? todo.dateOfCompletion.slice(5, 10) +
            " " +
            todo.dateOfCompletion.slice(11, 19)
          : "asasdd"}
      </span>

      <Button onClick={() => dispatch(deleteCompletedTodo(todo.id))}>
        Delete
      </Button>
    </div>
  );
};

export default TodoItemCompleted;