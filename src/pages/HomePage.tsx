import React, { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import CreateTaskForm from "../components/CreateTaskForm";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Wrapper from "../UI/Wrapper";
import s from "../css/HomePage.module.css";
import SortSelect from "../components/SortSelect";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import SearchBar from "../UI/SearchBar";
import { Todo } from "../types";
import { filterTodo } from "../store/reducers/TodoSlice";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const todos = useAppSelector((state) => state.todo.list);

  let todosFiltered: Array<Todo> = [...todos].filter((el) => {
    return (
      el.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      new Date(el.dateOfCreation)
        .toLocaleDateString()
        .includes(searchQuery.toLowerCase())
    );
  });

  const sort = useAppSelector((state) => state.todo.currentSort);

  useEffect(() => {
    dispatch(filterTodo(sort));
  }, []);

  return (
    <div>
      <Wrapper>
        <div className={s.todoBlock}>
          <TodoList todos={todosFiltered} />

          <Button onClick={() => setModal((modal) => !modal)}>
            <FontAwesomeIcon icon={faPlus} fontSize={"30px"} />
          </Button>
          <SortSelect
            sort={sort}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              dispatch(filterTodo(e.target.value));
            }}
          >
            <option value={"title"}>by title</option>
            <option value={"dateOfCreation"}>by date</option>
            <option value={"dateOfCreation_reverse"}>by date rev</option>
            <option value={"priority"}>priority</option>
          </SortSelect>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />
      </Wrapper>

      {modal ? (
        <Modal hideF={() => setModal((modal) => !modal)}>
          <CreateTaskForm hideF={() => setModal((modal) => !modal)} />
        </Modal>
      ) : null}
    </div>
  );
};

export default HomePage;
