import * as React from "react";
import TodoItem from "./TodoItem";
import s from "../css/TodoList.module.scss";
import { Todo, TodoCompleted } from "../types";
import TodoItemCompleted from "./TodoItemCompleted";

interface TodoListProps {
  todos: Array<Todo> | Array<TodoCompleted>;
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className={s.todolistContainer}>
      {todos.length ? null : <div className={s.errorMsg}>no todos found</div>}
      {todos.map((el) => {
        if (
          "dateOfCompletion" in el &&
          typeof el.dateOfCompletion !== "undefined"
        ) {
          return <TodoItemCompleted todo={el as TodoCompleted} key={el._id} />;
        } else {
          return <TodoItem todo={el as Todo} key={el._id} />;
        }
      })}
    </div>
  );
};

export default TodoList;
