import React, { useState } from "react";
import Wrapper from "../UI/Wrapper";
import Button from "../UI/Button";
import s from "../css/LoginPage.module.scss";
import { fetchLogin, logOut } from "../store/reducers/LoginSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { clearState } from "../store/reducers/TodoSlice";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const { loading, error, token, email, isLogin } = useAppSelector(
    (state) => state.login
  );

  const func = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.password.trim()) {
      dispatch(
        fetchLogin({ email: loginData.email, password: loginData.password })
      );
      setLoginData({
        email: "",
        password: "",
      });
    }
  };

  const logOutHandler = () => {
    dispatch(logOut());
    dispatch(clearState());
  };

  return (
    <Wrapper>
      <div>
        <h1>Login</h1>
        {!isLogin && (
          <form action="" onSubmit={func}>
            <input
              className={s.input}
              type={"email"}
              placeholder={"email"}
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <input
              className={s.input}
              type={"password"}
              placeholder={"password"}
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <Button>Login</Button>
          </form>
        )}
        {loading && <h1>Loading///</h1>}
        {/*<div>response: {email || error}</div>*/}
        <h1>{isLogin ? "logged in " + email : "not logged in"}</h1>
        <button onClick={logOutHandler}>Log out</button>
      </div>
    </Wrapper>
  );
};

export default LoginPage;
