import * as React from "react";
import TodoItem from "./TodoItem";
import s from "../css/TodoList.module.scss";
import { Todo } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useMemo } from "react";
import { fetchSortedTodos } from "../store/reducers/TodoSlice";
import { AnimatePresence, motion } from "framer-motion";

const TodoList: React.FC = () => {
  const {
    loading,
    error,
    list,
    currentSortUncompleted: sort,
    searchQuery,
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
    dispatch(fetchSortedTodos(sort));
  }, [dispatch, sort, list.length]);
  const AnimationVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0 },
    exit: { x: -200, opacity: 0 },
  };
  return (
    <div className={s.todolistContainer}>
      {/*{loading && (*/}
      {/*  <div className={s.todolistContainerBlur}>*/}
      {/*    <FadeLoader color="#fff" height={30} margin={15} width={6} />*/}
      {/*  </div>*/}
      {/*)}*/}
      {list.length
        ? null
        : isLogin && <div className={s.errorMsg}>no todos found</div>}
      <AnimatePresence>
        {isLogin &&
          searchedMas.map((el) => {
            return el.status ? null : (
              <TodoItem
                viewport={{ amount: 0.3 }}
                initial={"hidden"}
                whileInView={"visible"}
                exit={"exit"}
                transition={{ duration: 0.2 }}
                variants={AnimationVariants}
                todo={el as Todo}
                key={el._id}
              />
            );
          })}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
