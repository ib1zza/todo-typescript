import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { filterTodo } from "../store/reducers/TodoSlice";
import Select from "../UI/Select";

const SortSelect = () => {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.todo.currentSort);

  useEffect(() => {
    dispatch(filterTodo(sort));
  });

  return (
    <Select
      value={sort}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(filterTodo(e.target.value));
      }}
    >
      <option value={"title"}>by title</option>
      <option value={"dateOfCreation"}>by date</option>
      <option value={"dateOfCreation_reverse"}>by date rev</option>
      <option value={"priority"}>priority</option>
    </Select>
  );
};

export default SortSelect;
