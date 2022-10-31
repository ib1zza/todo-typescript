import React, { useEffect, useRef } from "react";
import s from "../css/Modal.module.css";

interface ModalProps {
  hideF: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ hideF, children }) => {
  return (
    <>
      <div className={s.modalBg}></div>
      <div className={s.modalBlock} onClick={hideF}>
        <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
