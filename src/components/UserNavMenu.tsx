import React, { useCallback, useEffect, useState } from "react";
import s from "../css/Navigation.module.scss";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "../constants";
import { logOut } from "../store/reducers/LoginSlice";
import { clearState } from "../store/reducers/TodoSlice";
import { useAppDispatch } from "../hooks/hooks";

interface Props {
  email: string;
}
const UserNavMenu: React.FC<Props> = ({ email }) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const dispatch = useAppDispatch();
  const logOutHandler = useCallback(() => {
    dispatch(logOut());
    dispatch(clearState());
  }, []);

  function toggler() {
    setVisibleMenu(false);
  }
  useEffect(() => {
    window.addEventListener("click", toggler);
    return () => window.removeEventListener("click", toggler);
  }, [visibleMenu]);

  return (
    <div className={s.emailBlock}>
      <button onClick={(e) => e.stopPropagation()}>
        <span onClick={() => setVisibleMenu((p) => !p)}>{email}</span>
      </button>

      {visibleMenu && (
        <div className={s.loginOptions}>
          <NavLink to={AppRoutes.login}>Profile</NavLink>
          <NavLink to={AppRoutes.login}>Settings</NavLink>
          <button onClick={logOutHandler}>Log Out {`->`}</button>
        </div>
      )}
    </div>
  );
};

export default UserNavMenu;
