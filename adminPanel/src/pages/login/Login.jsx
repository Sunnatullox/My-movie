import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFatching, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };
  return (
    <div class=" flex-r container">
      <div class="flex-r login-wrapper">
        <div class="login-text">
          <div class="logo">
            <span>
              <i class="fab fa-speakap"></i>
            </span>
            <span>My-Movie</span>
          </div>
          <h1>Sign IN from Admin</h1>
          <p>You earn money by downloading your movies and TV series in this Admin panel! </p>

          <form class="flex-c">
            <div class="input-box">
              <span class="label">E-mail</span>
              <div class=" flex-r input">
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@abc.com"
                />
                <i class="fas fa-at"></i>
              </div>
            </div>

            <div class="input-box">
              <span class="label">Password</span>
              <div class="flex-r input">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="8+ (a, A, 1, #)"
                />
                <i class="fas fa-lock"></i>
              </div>
            </div>
            <button onClick={handleLogin} disabled={isFatching} className="btn">
              login from admin panel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
