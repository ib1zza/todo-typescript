import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { filterTodo } from "../store/reducers/TodoSlice";

const SortSelect = () => {
  const dispatch = useAppDispatch();
  const [sort, setSort] = useState("dateOfCreation");

  useEffect(() => {
    dispatch(filterTodo(sort));
  }, [sort]);

  return (
    <select
      value={sort}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);
      }}
    >
      <option value={"title"}>by title</option>
      <option value={"dateOfCreation"}>by date</option>
    </select>
  );
};

export default SortSelect;
