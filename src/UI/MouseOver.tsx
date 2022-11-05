import React, { useState } from "react";
import s from "../css/MouseOver.module.css";
import Button from "./Button";

interface MouseOverProps {
  children?: React.ReactNode;
  text: string;
}

const MouseOver: React.FC<MouseOverProps> = ({ children, text }) => {
  const [show, setShow] = useState(false);
  const opacity = show ? 0 : 1;
  return (
    <>
      <div className={s.block}>
        <div className={s.block_active}>{text}</div>

        <Button>{children}</Button>
      </div>
    </>
  );
};

export default MouseOver;
