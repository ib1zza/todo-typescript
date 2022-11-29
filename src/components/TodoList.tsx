import * as React from "react";
import TodoItem from "./TodoItem";
import s from "../css/TodoList.module.scss";
import { Todo, TodoCompleted } from "../types";
import TodoItemCompleted from "./TodoItemCompleted";
import { useAppSelector } from "../hooks/hooks";

interface TodoListProps {
  todos: Array<Todo> | Array<TodoCompleted>;
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const isLogin = useAppSelector((state) => state.login.isLogin);
  return (
    <div className={s.todolistContainer}>
      {todos.length
        ? null
        : isLogin && <div className={s.errorMsg}>no todos found</div>}
      {!isLogin && <div>You must be logged in to watch that page!</div>}
      {isLogin &&
        todos.map((el) => {
          if (
            "dateOfCompletion" in el &&
            typeof el.dateOfCompletion !== "undefined"
          ) {
            return (
              <TodoItemCompleted todo={el as TodoCompleted} key={el._id} />
            );
          } else {
            return <TodoItem todo={el as Todo} key={el._id} />;
          }
        })}
    </div>
  );
};

export default TodoList;
