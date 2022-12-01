import React from "react";
import s from "../css/Burger.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
        <FontAwesomeIcon icon={faBars} />
      </div>
      {isActive && <div className={s.burgerContent}>{children}</div>}
    </>
  );
};

export default Burger;
