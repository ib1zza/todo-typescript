import React, { useState } from "react";
import Wrapper from "../UI/Wrapper";
import Button from "../UI/Button";
import s from "../css/LoginPage.module.scss";
import { fetchLogin, logOut } from "../store/reducers/LoginSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { clearState } from "../store/reducers/TodoSlice";
import { PulseLoader } from "react-spinners";

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
      <div className={s.loginWrapper}>
        <h1>Login</h1>
        {!isLogin && (
          <form action="" onSubmit={func}>
            <div>
              <span>Email:</span>
              <input
                type={"email"}
                placeholder={"example@mail.com"}
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </div>

            <div>
              <span>Password:</span>
              <input
                type={"password"}
                placeholder={"*************"}
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>

            <Button>
              {loading ? (
                <PulseLoader
                  color="rgba(255, 255, 255, 1)"
                  margin={5}
                  size={20}
                  speedMultiplier={1}
                />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        )}
        {isLogin && (
          <div className={s.loginInfo}>
            <h2>You are currently logged in at {email.toString()}</h2>
            <Button onClick={logOutHandler}>Log out</Button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default LoginPage;
