import React from "react";
import s from "../css/Wrapper.module.scss";

interface WrapperProps {
  children?: React.ReactNode;
}
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className={s.wrapper}>{children}</div>;
};

export default Wrapper;
