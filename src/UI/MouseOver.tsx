import React, { useState } from "react";
import s from "../css/MouseOver.module.scss";
import Button from "./Button";

interface MouseOverProps {
  children?: React.ReactNode;
  text: string;
}

const MouseOver: React.FC<MouseOverProps> = ({ children, text }) => {
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
