import React from "react";
import { useAppDispatch } from "../hooks/hooks";
import s from "../css/TodoItem.module.scss";
import Button from "../UI/Button";
import { deleteTodo } from "../store/reducers/TodoCompletedSlice";
import { TodoCompleted } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import MouseOver from "../UI/MouseOver";
import TodoDescription from "./TodoDescription";

interface TodoItemCompletedProps {
  todo: TodoCompleted;
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
      <div className={s.todo_block__description}>
        <TodoDescription todo={todo} />
      </div>
      <div className={s.buttons}>
        <MouseOver
          text={
            "Date of creation: " +
            todo.dateOfCreation.slice(0, 10) +
            " " +
            todo.dateOfCreation.slice(11, 19) +
            "\n" +
            "Date of completion: " +
            todo.dateOfCompletion.slice(5, 10) +
            " " +
            todo.dateOfCompletion.slice(11, 19)
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

export default TodoItemCompleted;
