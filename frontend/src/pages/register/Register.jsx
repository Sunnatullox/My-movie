import React, { useRef, useState } from "react";
import "./register.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar'
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const {user} = useContext(AuthContext);

  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  
  
  const  handleFinish = async(e) =>{
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setName(userNameRef.current.value);
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        name,
        password
      });
      return history.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <Navbar user={user}/>
    <div className="register">
      <div className="container">
        <h1>Unlimite movies, TV showa, and more</h1>
        <h2>Whatch anywhere. Cancel anytime</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <div className="inputdiv">
            <input type="email"  className="form-control"  aria-label="Username" aria-describedby="basic-addon1"ref={emailRef} placeholder="email adress" />
            </div>
            <button onClick={handleStart} className="btn registerButton">
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <div className="inputdiv">
            <input type="text" ref={userNameRef} placeholder="Last Name" />
            </div>
            <div className="inputdiv">
            <input type="password" ref={passwordRef} placeholder="password" />
            </div>
            <button onClick={handleFinish} className="btn registerButton">
              Start
            </button>
          </form>
        )}
      </div>
    </div>
    </>
  );
};

export default Register;
