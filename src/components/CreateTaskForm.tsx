import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { createTodo } from "../store/reducers/TodoSlice";
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
