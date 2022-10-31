import * as React from "react";
import { useAppSelector } from "../hooks/hooks";
import TodoItem from "./TodoItem";
import s from "../css/TodoList.module.css";

const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todo.list);

  return (
    <div className={s.todolistContainer}>
      {todos.map((el) => (
        <TodoItem todo={el} key={el.id} />
      ))}
    </div>
  );
};

export default TodoList;
