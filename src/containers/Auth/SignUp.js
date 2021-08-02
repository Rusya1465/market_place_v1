import React, { useContext, useState } from "react";
import { clientContext } from "../../contexts/ClientContext";

const SignUp = () => {
  const { registerUser } = useContext(clientContext);
  const [newUser, SetNewUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let obj = {
      ...newUser,
      [e.target.name]: e.target.value,
    };
    SetNewUser(obj);
    console.log(newUser);
  };

  const handleClick = () => {
    registerUser(newUser);
    SetNewUser({
      email: "",
      password: "",
    });
  };
  return (
    <div>
      <input onChange={handleInput} name="email" type="text" />
      <input onChange={handleInput} name="password" type="password" />
      <button onClick={handleClick}>Зарегестрироваться</button>
    </div>
  );
};

export default SignUp;
