import React, { useEffect, useRef, useState } from "react";
import Button from "../UI/Button";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchSortedTodos, FetchUpdateTodo } from "../store/reducers/TodoSlice";
import { Todo } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRotateLeft } from "@fortawesome/free-solid-svg-icons";

import s from "../css/EditForm.module.scss";

interface EditFormProps {
  prevTodo: Todo;
  onAbort: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ prevTodo, onAbort }) => {
  const [data, setData] = useState({
    title: prevTodo.title,
    description: prevTodo.description,
    priority: prevTodo.priority,
  });
  const dispatch = useAppDispatch();
  const titleInput = useRef<HTMLInputElement>(null);
  const sorting = useAppSelector((state) => state.todo.currentSortUncompleted);
  const submitHandler = () => {
    dispatch(
      FetchUpdateTodo({
        id: prevTodo._id,
        title: data.title,
        description: data.description ? data.description : "",
        priority: data.priority,
        status: prevTodo.status,
      })
    );
    dispatch(fetchSortedTodos(sorting));
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
          placeholder={"Title"}
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <input
          className={s.input_description}
          placeholder={"Description"}
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <div className={s.priority_block}>
          <p>Priority:</p>
          {[1, 2, 3, 4].map((el) => (
            <button
              className={
                s.prioriry_btn + " " + (el === data.priority ? s.active : "")
              }
              onClick={() => setData({ ...data, priority: el })}
            >
              {el}
            </button>
          ))}
        </div>
      </div>
      <div className={s.buttons}>
        <Button onClick={submitHandler}>
          <span> Submit </span>
          <FontAwesomeIcon icon={faCheck} />
        </Button>
        <Button onClick={onAbort}>
          <span> Cancel </span>
          <FontAwesomeIcon icon={faRotateLeft} />
        </Button>
      </div>
    </div>
  );
};

export default EditForm;
