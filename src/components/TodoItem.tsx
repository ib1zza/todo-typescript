import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import s from "../css/TodoItem.module.css";
import Button from "../UI/Button";
import { deleteTodo } from "../store/reducers/TodoSlice";
import ContextMenu from "../UI/ContextMenu";
import EditForm from "./EditForm";

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
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className={s.todoContainer}>
      <div className={s.todoDescription}>
        {editMode ? (
          <EditForm prevTodo={todo} closeF={() => setEditMode(false)} />
        ) : (
          <div>
            <h2>{todo.title}</h2>
            <p>{todo.description || null}</p>
          </div>
        )}
      </div>
      <Button onClick={() => setEditMode((editMode) => !editMode)}>Edit</Button>
      <span>{todo.dateOfCreation}</span>

      <Button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</Button>
    </div>
  );
};

export default TodoItem;
