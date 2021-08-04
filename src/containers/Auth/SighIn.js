import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { clientContext } from "../../contexts/ClientContext";

const SighIn = () => {
  const { loginUser } = useContext(clientContext);
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleInput(e) {
    let obj = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setUser(obj);
  }

  function handleClick() {
    loginUser(user, history);
  }
  return (
    <>
      <h2>Sign IN</h2>
      <div>
        <input onChange={handleInput} name="email" type="text" />
        <input onChange={handleInput} name="password" type="password" />
        <button onClick={handleClick}>Войти</button>
      </div>
    </>
  );
};

export default SighIn;
