import React, { useEffect, useRef, useState } from "react";
import Button from "../UI/Button";
import { useAppDispatch } from "../hooks/hooks";
import { editTodo } from "../store/reducers/TodoSlice";
import { Todo } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRotateLeft } from "@fortawesome/free-solid-svg-icons";

import s from "../css/EditForm.module.css";

interface EditFormProps {
  prevTodo: Todo;
  onAbort: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ prevTodo, onAbort }) => {
  const [data, setData] = useState({
    title: prevTodo.title,
    description: prevTodo.description,
  });
  const dispatch = useAppDispatch();
  const titleInput = useRef<HTMLInputElement>(null);

  const submitHandler = (): void => {
    dispatch(
      editTodo({
        ...prevTodo,
        title: data.title,
        description: data.description ? data.description : undefined,
      })
    );
    onAbort();
  };

  useEffect(() => {
    if (titleInput.current !== null) {
      titleInput.current.focus();
    }
  }, []);

  return (
    <div className={s.form_wrapper}>
      <div className={s.inputs_field}>
        <input
          ref={titleInput}
          className={s.input_title}
          placeholder={"title"}
          value={data.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, title: e.target.value })
          }
        />
        <input
          className={s.input_description}
          placeholder={"description"}
          value={data.description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, description: e.target.value })
          }
        />
      </div>
      <div className={s.buttons}>
        <Button onClick={() => submitHandler()}>
          Submit <FontAwesomeIcon icon={faCheck} />
        </Button>
        <Button onClick={() => onAbort()}>
          Back <FontAwesomeIcon icon={faRotateLeft} />
        </Button>
      </div>
    </div>
  );
};

export default EditForm;
