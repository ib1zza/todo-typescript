import React from "react";
import s from "../css/Button.module.css";
interface ButtonProps {
  children?: React.ReactNode;

  [x: string]: any;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button className={s.button} {...rest}>
      {children}
    </button>
  );
};

export default Button;
