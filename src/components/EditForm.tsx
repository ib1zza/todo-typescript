import React, { useState } from "react";
import Button from "../UI/Button";
import { useAppDispatch } from "../hooks/hooks";
import { editTodo } from "../store/reducers/TodoSlice";

interface EditFormProps {
  prevTodo: {
    id: string;
    title: string;
    description?: string;
    priority: number;
    dateOfCreation: string;
    isCompleted?: boolean;
  };
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
    </div>
  );
};

export default EditForm;
