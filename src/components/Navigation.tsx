import { NavLink } from "react-router-dom";
import s from "../css/Navigation.module.scss";
import React from "react";
import { AppRoutes } from "../constants";
import Wrapper from "../UI/Wrapper";
import { useAppSelector } from "../hooks/hooks";

import UserNavMenu from "./UserNavMenu";

const setStyles = ({ isActive }: { isActive: any }) => {
  return isActive ? s.link_active : s.link;
};

const Navigation: React.FC = () => {
  const { isLogin, email } = useAppSelector((state) => state.login);
  return (
    <div className={s.container}>
      <Wrapper className={s.navigation}>
        <div className={s.pagesBlock}>
          <NavLink className={setStyles} to={AppRoutes.todos}>
            Home
          </NavLink>
          <NavLink className={setStyles} to={AppRoutes.completed}>
            Completed
          </NavLink>
        </div>

        {!isLogin && (
          <div className={s.loginBlock}>
            <NavLink to={AppRoutes.login}>Login</NavLink>
            <NavLink to={AppRoutes.register}>Register</NavLink>
          </div>
        )}
        {isLogin && <UserNavMenu email={email} />}
      </Wrapper>
    </div>
  );
};

export default Navigation;
