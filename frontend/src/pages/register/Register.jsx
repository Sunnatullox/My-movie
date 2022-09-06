import React, { useRef, useState } from "react";
import "./register.scss";
import Logo from "../../image/My_Movie-removebg-preview.png";



const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
    setPassword("")
  };


  const handleFinish = () => {
    setPassword(passwordRef.current.value)
  }

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={Logo} alt="" />
          <button className="loginbutton">Sign In</button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimite movies, TV showa, and more</h1>
        <h2>Whatch anywhere. Cancel anytime</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <from className="input">
            <input type="email" ref={emailRef} placeholder="email adress" />
            <button onClick={handleStart} className="registerButton">
              Get Started
            </button>
          </from>
        ) : (
          <div className="input">
            <input type="password"  ref={passwordRef} placeholder="password" />
            <button onClick={handleFinish} className="registerButton">
              Start
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
