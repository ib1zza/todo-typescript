import * as React from "react";
import TodoItem from "./TodoItem";
import s from "../css/TodoList.module.css";
import { Todo } from "../types";
import TodoItemCompleted from "./TodoItemCompleted";
import { useState } from "react";
import SearchBar from "../UI/SearchBar";

interface TodoListProps {
  todos: Array<Todo>;
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const todosFiltered = [...todos].filter(
    (el) =>
      el.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      new Date(el.dateOfCreation)
        .toLocaleDateString()
        .includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className={s.todolistContainer}>
        {todosFiltered.length ? null : "no todos found"}
        {todosFiltered.map((el) =>
          el.dateOfCompletion === undefined ? (
            <TodoItem todo={el} key={el.id} />
          ) : (
            <TodoItemCompleted todo={el} key={el.id} />
          )
        )}
      </div>

      <SearchBar
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
      />
    </>
  );
};

export default TodoList;
