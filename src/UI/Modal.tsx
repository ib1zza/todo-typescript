import React from "react";
import s from "../css/Modal.module.scss";

interface ModalProps {
  hideF: () => void;
  children?: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ hideF, children, title }) => {
  return (
    <>
      <div className={s.modalBg}></div>
      <div className={s.modalBlock} onClick={hideF}>
        <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
          {title ? <div className={s.modalTitle}>{title}</div> : null}
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
