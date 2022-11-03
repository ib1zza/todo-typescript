import React, { useState } from "react";
import Button from "../UI/Button";
import { useAppDispatch } from "../hooks/hooks";
import { editTodo } from "../store/reducers/TodoSlice";
import { Todo } from "../types";

interface EditFormProps {
  prevTodo: Todo;
  closeF: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ prevTodo, closeF }) => {
  const [data, setData] = useState({
    title: prevTodo.title,
    description: prevTodo.description,
  });
  const dispatch = useAppDispatch();

  const handler = (): void => {
    dispatch(
      editTodo({
        ...prevTodo,
        title: data.title,
        description: data.description ? data.description : undefined,
      })
    );
    closeF();
  };

  return (
    <div>
      <div>
        <input
          placeholder={"title"}
          value={data.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, title: e.target.value })
          }
        />
        <input
          placeholder={"description"}
          value={data.description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, description: e.target.value })
          }
        />
      </div>
      <Button onClick={() => handler()}>Submit</Button>
      <Button onClick={() => closeF()}>Back</Button>
    </div>
  );
};

export default EditForm;
