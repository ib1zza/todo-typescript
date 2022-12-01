import * as React from "react";
import s from "../css/TodoList.module.scss";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useMemo } from "react";
import { fetchAllCompletedTodos } from "../store/reducers/TodoSlice";
import { FadeLoader } from "react-spinners";
import TodoItemCompleted from "./TodoItemCompleted";

const TodoListCompleted: React.FC<{ searchQuery: string }> = ({
  searchQuery,
}) => {
  const {
    loading,
    error,
    completedList: list,
    currentSortUncompleted: sort,
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
    console.log("useEffectWorking");
    dispatch(fetchAllCompletedTodos());
  }, [dispatch, sort, list.length]);

  return (
    <div className={s.todolistContainer}>
      {loading && (
        <div className={s.todolistContainerBlur}>
          <FadeLoader color="#fff" height={30} margin={15} width={6} />
        </div>
      )}
      {list.length
        ? null
        : isLogin && (
            <div className={s.errorMsg}>{error || "no todos found "}</div>
          )}

      {isLogin &&
        searchedMas.map((el) => <TodoItemCompleted todo={el} key={el._id} />)}
    </div>
  );
};

export default TodoListCompleted;
