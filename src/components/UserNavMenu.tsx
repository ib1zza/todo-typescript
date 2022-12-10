import React, { useCallback, useEffect, useState } from "react";
import s from "../css/Navigation.module.scss";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "../constants";
import { logOut } from "../store/reducers/LoginSlice";
import { clearState } from "../store/reducers/TodoSlice";
import { useAppDispatch } from "../hooks/hooks";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

interface Props {
  email: string;
}
const UserNavMenu: React.FC<Props> = ({ email }) => {
  const Variants = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  const [visibleMenu, setVisibleMenu] = useState(false);
  const dispatch = useAppDispatch();
  const logOutHandler = useCallback(() => {
    dispatch(logOut());
    dispatch(clearState());
  }, [dispatch]);

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
      <AnimatePresence>
        {visibleMenu && (
          <motion.div
            className={s.loginOptions}
            variants={Variants}
            initial={"hidden"}
            animate={"visible"}
            exit={"hidden"}
            transition={{ duration: 0.2 }}
          >
            <NavLink to={AppRoutes.login}>Profile</NavLink>
            <NavLink to={AppRoutes.login}>Settings</NavLink>
            <button onClick={logOutHandler}>Log Out {`->`}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserNavMenu;
