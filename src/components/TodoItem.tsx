import React from "react";
import { useAppDispatch } from "../hooks/hooks";
import s from "../css/TodoItem.module.css";
import Button from "../UI/Button";
import { deleteTodo } from "../store/reducers/TodoSlice";

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    description?: string;
    dateOfCreation: string;
    isCompleted?: boolean;
  };
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={s.todoContainer}>
      <div className={s.todoDescription}>
        <h2>{todo.title}</h2>
        <p>{todo.description || null}</p>
      </div>
      <span>{todo.dateOfCreation}</span>
      <Button onClick={() => dispatch(deleteTodo(todo.id))}>X</Button>
    </div>
  );
};

export default TodoItem;
