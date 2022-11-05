import React, { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import s from "../css/TodoItem.module.css";
import Button from "../UI/Button";
import { completeTodo, deleteTodo } from "../store/reducers/TodoSlice";
import EditForm from "./EditForm";
import { Todo } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPenToSquare,
  faInfo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { addTodo } from "../store/reducers/TodoCompletedSlice";
import MouseOver from "../UI/MouseOver";

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
      <div className={s.todo_block__description}>
        <>
          <button
            disabled={editMode}
            className={s.completeButton}
            onClick={() => {
              dispatch(
                addTodo({
                  ...todo,
                  dateOfCompletion: new Date(Date.now()).toISOString(),
                })
              );
              dispatch(completeTodo(todo.id));
            }}
          >
            <FontAwesomeIcon icon={faCircleCheck} />
          </button>
          {editMode ? (
            <EditForm prevTodo={todo} onAbort={() => setEditMode(false)} />
          ) : (
            <div className={s.todo_info}>
              <h2 className={s.todo_title}>{todo.title}</h2>
              <p className={s.todo_description}>{todo.description || null}</p>
            </div>
          )}
        </>
      </div>
      <div className={s.buttons}>
        {" "}
        <Button onClick={() => setEditMode((editMode) => !editMode)}>
          Edit <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
        <MouseOver
          text={
            "Date of creation: " +
            todo.dateOfCreation.slice(0, 10) +
            " " +
            todo.dateOfCreation.slice(11, 19)
          }
        >
          <FontAwesomeIcon icon={faInfo} />
        </MouseOver>
        <Button onClick={() => dispatch(deleteTodo(todo.id))}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
