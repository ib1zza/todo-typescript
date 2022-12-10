import React from "react";
import s from "../css/Modal.module.scss";
import { motion } from "framer-motion";

interface ModalProps {
  hideF: () => void;
  children?: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ hideF, children, title }) => {
  return (
    <>
      <motion.div
        className={s.modalBg}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
      ></motion.div>
      <motion.div
        className={s.modalBlock}
        onClick={hideF}
        initial={{ y: -300 }}
        animate={{ y: 0 }}
        exit={{ y: -300, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
          {title ? <div className={s.modalTitle}>{title}</div> : null}
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default Modal;
