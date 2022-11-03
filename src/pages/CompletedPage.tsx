import TodoList from "../components/TodoList";
import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/hooks";
import Wrapper from "../UI/Wrapper";

const CompletedPage = () => {
  const todos = useAppSelector((state) => state.todo.completedList);
  return (
    <div>
      <Wrapper>
        <TodoList todos={todos} />
      </Wrapper>
      CompletedPage
    </div>
  );
};

export default CompletedPage;
