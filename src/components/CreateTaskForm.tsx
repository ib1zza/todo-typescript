import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { createTodo, filterTodo } from "../store/reducers/TodoSlice";
import Button from "../UI/Button";

interface CreateTaskFormProps {
  hideF: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ hideF }) => {
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
  });
  //функция проверяет записано ли чтото в заголовке нового туду и если да, то отправляет запрос на создание нового туду, а также вызывает перерисовку списка для его корректного отображения.
  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.title.trim()) {
      dispatch(
        createTodo({
          id: Date.now().toString(),
          title: state.title,
          description: state.description.trim() ? state.description : undefined,
          dateOfCreation: new Date().toISOString(),
        })
      );
      setState({
        title: "",
        description: "",
      });
      dispatch(filterTodo("current"));
      hideF();
    }
  };
  return (
    <form action="" onSubmit={check}>
      <input
        type="text"
        placeholder="title"
        ref={titleRef}
        value={state.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setState((state) => {
            return { ...state, title: e.target.value };
          })
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

      <Button type={"submit"}>Create task</Button>
    </form>
  );
};

export default CreateTaskForm;
