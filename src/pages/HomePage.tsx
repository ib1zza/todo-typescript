import React, { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import CreateTaskForm from "../components/CreateTaskForm";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Wrapper from "../UI/Wrapper";
import s from "../css/HomePage.module.css";
import SortSelect from "../components/SortSelect";
import { useAppSelector } from "../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import SearchBar from "../UI/SearchBar";
import { Todo } from "../types";

const HomePage: React.FC = () => {
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

  return (
    <div>
      <Wrapper>
        <div className={s.todoBlock}>
          <TodoList todos={todosFiltered} />

          <Button onClick={() => setModal((modal) => !modal)}>
            <FontAwesomeIcon icon={faPlus} fontSize={"30px"} />
          </Button>
          <SortSelect />
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
