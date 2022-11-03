import * as React from "react";
import TodoItem from "./TodoItem";
import s from "../css/TodoList.module.css";
import { Todo, TodoCompleted } from "../types";
import TodoItemCompleted from "./TodoItemCompleted";

interface TodoListProps {
  todos: Array<Todo>;
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className={s.todolistContainer}>
      {todos.length ? null : "no todos found"}
      {todos.map((el) =>
        el.dateOfCompletion === undefined ? (
          <TodoItem todo={el} key={el.id} />
        ) : (
          <TodoItemCompleted todo={el} key={el.id} />
        )
      )}
    </div>
  );
};

export default TodoList;
