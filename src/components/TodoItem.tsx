import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import s from "../css/TodoItem.module.css";
import Button from "../UI/Button";
import { deleteTodo } from "../store/reducers/TodoSlice";
import EditForm from "./EditForm";

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    description?: string;
    priority: number;
    dateOfCreation: string;
    isCompleted?: boolean;
  };
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [editMode, setEditMode] = useState(false);
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
