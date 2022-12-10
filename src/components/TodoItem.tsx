import React, { ForwardedRef, useMemo, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import s from "../css/TodoItem.module.scss";
import Button from "../UI/Button";
import {
  FetchCompleteTodo,
  FetchDeleteTodo,
} from "../store/reducers/TodoSlice";
import EditForm from "./EditForm";
import { Todo } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPenToSquare,
  faInfo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import MouseOver from "../UI/MouseOver";
import TodoDescription from "./TodoDescription";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { forwardRef } from "react";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = forwardRef(
  ({ todo }, ref: ForwardedRef<HTMLDivElement>) => {
    const [editMode, setEditMode] = useState(false);
    // const [col, setCol] = useState(todo.priority);
    const dispatch = useAppDispatch();

    const wrapperClasses = useMemo(() => {
      let wp = s.todoContainer;

      if (editMode) {
        return wp + " " + s.todoContainer_Editing;
      }
      switch (todo.priority) {
        case 1:
          wp += " " + s.p1;
          break;
        case 2:
          wp += " " + s.p2;
          break;
        case 3:
          wp += " " + s.p3;
          break;
        case 4:
          wp += " " + s.p4;
          break;
      }
      return wp;
    }, [todo.priority, editMode]);

    const handleCompleteTodo = () => {
      dispatch(FetchCompleteTodo(todo));
    };

    return (
      <div ref={ref}>
        <AnimateSharedLayout>
          <motion.div layout className={wrapperClasses}>
            <motion.div layout className={s.todo_block__description}>
              <button
                disabled={editMode}
                className={s.completeButton}
                onClick={handleCompleteTodo}
              >
                <FontAwesomeIcon icon={faCircleCheck} />
              </button>

              {editMode ? (
                <motion.div>
                  <EditForm
                    prevTodo={todo}
                    onAbort={() => setEditMode(false)}
                  />
                </motion.div>
              ) : (
                <motion.div>
                  <TodoDescription todo={todo} />
                </motion.div>
              )}
            </motion.div>

            <div className={s.buttons}>
              {!editMode && (
                <>
                  <Button onClick={() => setEditMode((editMode) => !editMode)}>
                    <div className={s.buttonEdit}>Edit</div>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>

                  <MouseOver
                    text={
                      "Date of creation: " +
                      todo.createdAt.slice(0, 10) +
                      " " +
                      todo.createdAt.slice(11, 19)
                    }
                  >
                    <FontAwesomeIcon icon={faInfo} />
                  </MouseOver>
                  <Button onClick={() => dispatch(FetchDeleteTodo(todo._id))}>
                    <FontAwesomeIcon icon={faXmark} />
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </AnimateSharedLayout>
      </div>
    );
  }
);

export default motion(TodoItem);
