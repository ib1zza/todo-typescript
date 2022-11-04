import TodoList from "../components/TodoList";
import React, { useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import Wrapper from "../UI/Wrapper";
import SearchBar from "../UI/SearchBar";
import { Todo } from "../types";
import SortSelect from "../components/SortSelect";

const CompletedPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const todos = useAppSelector((state) => state.todo.completedList);

  let todosFiltered: Array<Todo> = [...todos].filter((el) => {
    return (
      el.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      new Date(el.dateOfCreation)
        .toLocaleDateString()
        .includes(searchQuery.toLowerCase()) ||
      new Date(el.dateOfCompletion || 0)
        .toLocaleDateString()
        .includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <Wrapper>
        <TodoList todos={todosFiltered} />

        <SearchBar
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />

        <SortSelect />
      </Wrapper>
      CompletedPage
    </div>
  );
};

export default CompletedPage;
