import React from "react";
import s from "../css/Select.module.scss";
interface SelectProps {
  children?: React.ReactNode;
  params?: any[];
  [x: string]: any;
}
const Select: React.FC<SelectProps> = ({ children, ...params }) => {
  return (
    <select className={s.select} {...params}>
      {children}
    </select>
  );
};

export default Select;
