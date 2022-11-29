import * as React from "react";
import TodoItem from "./TodoItem";
import s from "../css/TodoList.module.scss";
import { Todo, TodoCompleted } from "../types";
import TodoItemCompleted from "./TodoItemCompleted";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useMemo } from "react";
import { fetchSortedTodos } from "../store/reducers/TodoSlice";
import { ClipLoader, FadeLoader, ScaleLoader } from "react-spinners";

const TodoList: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const {
    loading,
    error,
    list,
    currentSort: sort,
  } = useAppSelector((state) => state.todo);

  const searchedMas = useMemo(
    () =>
      [...list].filter(
        (el) =>
          el.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (el.description &&
            el.description.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [searchQuery, list]
  );

  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.login.isLogin);

  useEffect(() => {
    if (!isLogin) return;
    dispatch(fetchSortedTodos(sort));
  }, [dispatch, sort, list.length, isLogin]);

  return (
    <div className={s.todolistContainer}>
      {loading && (
        <div className={s.todolistContainerBlur}>
          <FadeLoader color="#fff" height={30} margin={15} width={6} />
        </div>
      )}
      {list.length
        ? null
        : isLogin && <div className={s.errorMsg}>no todos found</div>}

      {isLogin &&
        searchedMas.map((el) => {
          // if (
          //   "dateOfCompletion" in el &&
          //   typeof el.dateOfCompletion !== "undefined"
          // ) {
          //   return (
          //     <TodoItemCompleted todo={el as TodoCompleted} key={el._id} />
          //   );
          // } else {
          return <TodoItem todo={el as Todo} key={el._id} />;
          // }
        })}
    </div>
  );
};

export default TodoList;
