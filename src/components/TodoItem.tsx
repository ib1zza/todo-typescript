import React, { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import s from "../css/TodoItem.module.css";
import Button from "../UI/Button";
import { completeTodo, deleteTodo } from "../store/reducers/TodoSlice";
import EditForm from "./EditForm";
import { Todo } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();

  let wrapperClasses = s.todoContainer;
  if (todo.hasOwnProperty("dateOfCompletion")) {
  }
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
      {!editMode ? (
        <button
          className={s.completeButton}
          onClick={() => dispatch(completeTodo(todo.id))}
        >
          <FontAwesomeIcon icon={faCircleCheck} />
        </button>
      ) : null}

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
      <Button onClick={() => setEditMode((editMode) => !editMode)}>
        Edit <FontAwesomeIcon icon={faPenToSquare} />
      </Button>
      <span className={s.timeBlock}>
        {todo.dateOfCreation.slice(5, 10) +
          " " +
          todo.dateOfCreation.slice(11, 19)}
      </span>

      <Button onClick={() => dispatch(deleteTodo(todo.id))}>
        <FontAwesomeIcon icon={faXmark} />
      </Button>
    </div>
  );
};

export default TodoItem;
