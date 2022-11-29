import React, { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import CreateTaskForm from "../components/CreateTaskForm";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Wrapper from "../UI/Wrapper";
import s from "../css/HomePage.module.scss";
import SortSelect from "../components/SortSelect";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import SearchBar from "../UI/SearchBar";
import { Todo } from "../types";
import {
  fetchAllTodos,
  fetchSortedTodos,
  setCurrentSort,
} from "../store/reducers/TodoSlice";
import Burger from "../UI/Burger";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const [menu, setMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const sort = useAppSelector((state) => state.todo.currentSort);
  const isLogin = useAppSelector((state) => state.login.isLogin);

  if (!isLogin) {
    return (
      <Wrapper>
        <div>You must be logged in to watch that page!</div>
      </Wrapper>
    );
  }

  return (
    <div>
      <Wrapper>
        <div className={s.todoBlock}>
          <TodoList searchQuery={searchQuery} />
        </div>
        <Burger isActive={menu} hideF={() => setMenu(!menu)}>
          <h1 className={s.header}>sort & search</h1>
          <SearchBar
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
          <SortSelect
            sort={sort}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              dispatch(setCurrentSort(e.target.value));
              console.log(e.target.value);
              dispatch(fetchSortedTodos(e.target.value));
            }}
          >
            <option value={"date"}>by data</option>
            <option value={"daterev"}>by datarev</option>
            <option value={"priority"}>by priority </option>
            <option value={"title"}>by title </option>
          </SortSelect>
          <div>
            <Button
              style={{ borderRadius: "50%" }}
              onClick={() => setModal((modal) => !modal)}
            >
              <FontAwesomeIcon icon={faPlus} fontSize={"30px"} />
            </Button>
          </div>
        </Burger>
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
              dispatch(setCurrentSort(e.target.value));
              console.log(e.target.value);
              dispatch(fetchSortedTodos(e.target.value));
            }}
          >
            <option value={"date"}>by date</option>
            <option value={"daterev"}>by datarev</option>
            <option value={"priority"}>by priority </option>
            <option value={"title"}>by title </option>
          </SortSelect>
          <div>
            <Button
              style={{ borderRadius: "50%" }}
              onClick={() => setModal((modal) => !modal)}
            >
              <FontAwesomeIcon icon={faPlus} fontSize={"30px"} />
            </Button>
          </div>
        </div>
      </Wrapper>

      {modal ? (
        <Modal
          title={"Create new task"}
          hideF={() => setModal((modal) => !modal)}
        >
          <CreateTaskForm hideModal={() => setModal((modal) => !modal)} />
        </Modal>
      ) : null}
    </div>
  );
};

export default HomePage;
