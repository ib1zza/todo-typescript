import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { createTodo, filterTodo } from "../store/reducers/TodoSlice";
import Button from "../UI/Button";

import s from "../css/CreateTaskForm.module.css";
import Select from "../UI/Select";

interface CreateTaskFormProps {
  hideModal: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ hideModal }) => {
  const dispatch = useAppDispatch();
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleRef.current !== null) {
      titleRef.current.focus();
    }
  }, []);

  const [state, setState] = useState({
    title: "",
    description: "",
    priority: 0,
  });
  //функция проверяет записано ли чтото в заголовке нового туду и если да, то отправляет запрос на создание нового туду,
  // а также вызывает перерисовку списка для его корректного отображения.
  const check = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (state.title.trim()) {
      dispatch(
        createTodo({
          id: Date.now().toString(),
          title: state.title,
          description: state.description.trim() ? state.description : undefined,
          dateOfCreation: new Date().toISOString(),
          priority: state.priority === 0 ? 4 : state.priority,
        })
      );
      setState({
        title: "",
        description: "",
        priority: 0,
      });
      dispatch(filterTodo());
      hideModal();
    }
  };
  return (
    <form action="" onSubmit={check} className={s.form}>
      <input
        style={{ fontWeight: "bold" }}
        type="text"
        placeholder="title"
        ref={titleRef}
        value={state.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setState((state) => {
            return { ...state, title: e.target.value };
          })
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          e.key === "Enter" ? check() : null
        }
      />
      <input
        type="text"
        placeholder="description (optional)"
        value={state.description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setState((state) => {
            return { ...state, description: e.target.value };
          })
        }
      />

      <Select
        value={state.priority}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setState({ ...state, priority: Number(e.target.value) });
        }}
      >
        <option selected={true} disabled value={0} style={{ display: "none" }}>
          select priority
        </option>
        <option value={"1"}>priority 1</option>
        <option value={"2"}>priority 2</option>
        <option value={"3"}>priority 3</option>
        <option value={"4"}>none</option>
      </Select>

      <Button type={"submit"}>Create task</Button>
    </form>
  );
};

export default CreateTaskForm;
