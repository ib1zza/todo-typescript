import { Link, NavLink } from "react-router-dom";
import s from "../css/Navigation.module.css";
import React from "react";

const Navigation: React.FC = () => {
  return (
    <nav className={s.navigation}>
      <NavLink className={s.link} to="/">
        Home
      </NavLink>
      <NavLink className={s.link} to="/favourites">
        Favourites
      </NavLink>
    </nav>
  );
};

export default Navigation;
