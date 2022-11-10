import React from "react";
import s from "../css/Burger.module.scss";

interface BurgerProps {
  isActive: boolean;
  hideF: () => void;
  children?: React.ReactNode;
}

const Burger: React.FC<BurgerProps> = ({ isActive, hideF, children }) => {
  return (
    <>
      {isActive && <div className={s.burgerBg} onClick={hideF}></div>}
      <div className={s.burger} onClick={hideF}>
        <span></span>
      </div>
      {isActive && <div className={s.burgerContent}>{children}</div>}
    </>
  );
};

export default Burger;
