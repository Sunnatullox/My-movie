import "./login.scss";
import Logo from "../../image/My_Movie-removebg-preview.png";
import { useContext, useState } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../../components/footer/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    if(!email){
      return toast.error("Sorry, you did not enter your email")
    }else if(!password){
      return toast.error("Sorry, you did not enter a password")
    }else{
      e.preventDefault();
      login({ email, password }, dispatch);
    }
  };


  return (
    <>
      <Navbar user={user} loginIn={"Sign In"} />
      <div className="login">
        <ToastContainer />
        <div className="container">
          <form>
            <h1>Sign In</h1>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email or phone number"
              required
            />
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button onClick={handleLogin} className="btn loginButton">
              Sign In
            </button>
            <span>
              New to My movie? <Link to="/register">Sign Up now.</Link>
            </span>
            <small>
              This page is protected by Google reCaptcha to ensure you're not a
              bot. <b>Learn more</b>.
            </small>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
