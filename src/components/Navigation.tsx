import { NavLink } from "react-router-dom";
import s from "../css/Navigation.module.scss";
import React from "react";
import { AppRoutes } from "../constants";

const setStyles = ({ isActive }: { isActive: any }) => {
  return isActive ? s.link_active : s.link;
};

const Navigation: React.FC = () => {
  return (
    <nav className={s.navigation}>
      <NavLink className={setStyles} to={AppRoutes.todos}>
        Home
      </NavLink>
      <NavLink className={setStyles} to={AppRoutes.completed}>
        Completed
      </NavLink>
      <NavLink className={setStyles} to={AppRoutes.login}>
        Login
      </NavLink>
      <NavLink className={setStyles} to={AppRoutes.register}>
        Register
      </NavLink>
    </nav>
  );
};

export default Navigation;
