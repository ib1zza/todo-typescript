import React from "react";
import s from "../css/Wrapper.module.css";

interface WrapperProps {
  children?: React.ReactNode;
}
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className={s.wrapper}>{children}</div>;
};

export default Wrapper;
