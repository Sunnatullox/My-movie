import React, { useRef, useState } from "react";
import "./register.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [registerid, setRegisterid] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { user } = useContext(AuthContext);



  const handleStart = (e) => {
    e.preventDefault()
    if(email){
      return setRegisterid(true)
    }else{
      toast.error("Sorry, you did not enter your email")
    }
  };



  const  handleFinish = async(e)  =>{
    e.preventDefault();
    if (name && password && email) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            email,
            name,
            password,
          }
        );
        console.log(res);
        return history.push("/login");
      } catch (error) {
        toast.error(error.response.data.msg)
        return 
      }
    } else {
      return toast.error("Sorry, you did not enter username or password");
    }
  }

  if(!email){
    //  setRegisterid(false)
  }

  return (
    <>
      <Navbar user={user} />
      <div className="register">
        <ToastContainer />
        <div className="container">
          <h1>Unlimite movies, TV showa, and more</h1>
          <h2>Whatch anywhere. Cancel anytime</h2>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          { !registerid ? (
            <div className="input">
              <input
                type="email"
                className="form-control is-invalid"
                aria-describedby="basic-addon1"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email adress"
                required
              />
              <button onClick={ handleStart} className="btn registerButton">
                Get Started
              </button>
            </div>
          ) : (
            <form className="input">
              <div className="inputdiv">
                <input
                  className="form-control is-invalid"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="inputdiv">
                <input
                  className="form-control is-invalid"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  required
                />
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
