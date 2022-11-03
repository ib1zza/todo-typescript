import { Link, NavLink } from "react-router-dom";
import s from "../css/Navigation.module.css";
import React from "react";

const setStyles = ({ isActive }: { isActive: any }) => {
  return isActive ? s.link_active : s.link;
};

const Navigation: React.FC = () => {
  return (
    <nav className={s.navigation}>
      <NavLink className={setStyles} to="/home">
        Home
      </NavLink>
      <NavLink className={setStyles} to="/completed">
        Completed
      </NavLink>
    </nav>
  );
};

export default Navigation;
