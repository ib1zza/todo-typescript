import TodoList from "../components/TodoList";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Wrapper from "../UI/Wrapper";
import SearchBar from "../UI/SearchBar";
import { Todo } from "../types";
import SortSelect from "../components/SortSelect";
import { filterTodo } from "../store/reducers/TodoCompletedSlice";
import s from "../css/CompletedPage.module.scss";

const CompletedPage = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const todos = useAppSelector((state) => state.todoCompleted.todos);

  // let todosFiltered: Array<Todo> = [...todos].filter((el) => {
  //   return (
  //     el.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     new Date(el.dateOfCreation)
  //       .toLocaleDateString()
  //       .includes(searchQuery.toLowerCase()) ||
  //     new Date(el.dateOfCompletion || 0)
  //       .toLocaleDateString()
  //       .includes(searchQuery.toLowerCase())
  //   );
  // });

  const sort = useAppSelector((state) => state.todoCompleted.currentSort);

  useEffect(() => {
    dispatch(filterTodo(sort));
  }, []);

  return (
    <div>
      <Wrapper>
        <div className={s.todoBlock}>{/*<TodoList todos={todos} />*/}</div>

        <div className={s.todoFilters}>
          <SearchBar
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />

          <SortSelect
            sort={sort}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              dispatch(filterTodo(e.target.value));
            }}
          >
            <option value={"title"}>by title</option>
            <option value={"dateOfCreation"}>by date</option>
            <option value={"dateOfCreation_reverse"}>by date rev</option>

            <option value={"dateOfCompletion"}>by date of completion </option>
            <option value={"dateOfCompletion_reverse"}>
              by date of completion rev
            </option>
            <option value={"priority"}>priority</option>
          </SortSelect>
        </div>
      </Wrapper>
    </div>
  );
};

export default CompletedPage;
