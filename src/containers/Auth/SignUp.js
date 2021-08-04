import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { clientContext } from "../../contexts/ClientContext";

const SignUp = () => {
  const { registerUser } = useContext(clientContext);
  const history = useHistory();
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
    // console.log(newUser);
  };

  const handleClick = () => {
    // console.log(newUser);
    registerUser(newUser, history);
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
