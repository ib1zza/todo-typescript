import React from "react";
import Select from "../UI/Select";

interface SortSelectProps {
  sort: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children?: React.ReactNode;
}

const SortSelect: React.FC<SortSelectProps> = ({
  sort,
  onChange,
  children,
}) => {
  return (
    <Select value={sort} onChange={onChange}>
      {children}
    </Select>
  );
};

export default SortSelect;
