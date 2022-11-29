import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchRegistration } from "../store/reducers/RegistrationSlice";
import Wrapper from "../UI/Wrapper";
import s from "../css/LoginPage.module.scss";
import Button from "../UI/Button";

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
      <div>
        <h1>Register</h1>
        <form action="" onSubmit={func}>
          <input
            className={s.input}
            type={"email"}
            placeholder={"email"}
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
          />
          <input
            className={s.input}
            type={"password"}
            placeholder={"password"}
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
          />
          <Button>Register</Button>
        </form>
        {loading && <h1>Loading///</h1>}
        {isSuccessFull && <div>response: {email}</div>}
        {error && <div>error: {error}</div>}
      </div>
    </Wrapper>
  );
};

export default RegisterPage;
