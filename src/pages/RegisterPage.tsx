import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchRegistration } from "../store/reducers/RegistrationSlice";
import Wrapper from "../UI/Wrapper";
import s from "../css/RegisterPage.module.scss";
import Button from "../UI/Button";
import { PulseLoader } from "react-spinners";
import { Link, NavLink } from "react-router-dom";
import { AppRoutes } from "../constants";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const { loading, error, email, isSuccessFull } = useAppSelector(
    (state) => state.register
  );

  const func = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password.trim()) {
      dispatch(
        fetchRegistration({
          email: registerData.email,
          password: registerData.password,
        })
      );
    }
  };

  return (
    <Wrapper>
      <div className={s.registerWrapper}>
        <h1>Register</h1>
        {!isSuccessFull && (
          <form action="" onSubmit={func}>
            <div>
              <span>Email:</span>
              <input
                type={"email"}
                placeholder={"example@mail.com"}
                required
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
            </div>
            <div>
              <span>Password:</span>
              <input
                type={"password"}
                placeholder={"*************"}
                value={registerData.password}
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
            </div>
            {error && <h4 className={s.errorMsg}>error: {error}</h4>}

            <Button>
              {loading ? (
                <PulseLoader
                  color="rgba(255, 255, 255, 1)"
                  margin={5}
                  size={20}
                  speedMultiplier={1}
                />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        )}
        {isSuccessFull && (
          <div className={s.successMsg}>
            <h4>You have been successfully registered, now you can log in!</h4>
            <Button>
              <NavLink className={s.successMsgButton} to={AppRoutes.login}>
                Login page
              </NavLink>
            </Button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default RegisterPage;
