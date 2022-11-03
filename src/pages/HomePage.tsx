import React, { useState } from "react";
import TodoList from "../components/TodoList";
import CreateTaskForm from "../components/CreateTaskForm";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Wrapper from "../UI/Wrapper";
import s from "../css/HomePage.module.css";
import SortSelect from "../components/SortSelect";
import { useAppSelector } from "../hooks/hooks";

const HomePage: React.FC = () => {
  const [modal, setModal] = useState(false);
  const todos = useAppSelector((state) => state.todo.list);
  return (
    <div>
      <Wrapper>
        <div className={s.todoBlock}>
          <TodoList todos={todos} />

          <Button onClick={() => setModal((modal) => !modal)}>
            create task
          </Button>
          <SortSelect />
        </div>
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
