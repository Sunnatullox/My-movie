import "./login.scss";
import Logo from "../../image/My_Movie-removebg-preview.png";
import { useContext, useState } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user , dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    login({ email, password }, dispatch);
  };
  return (
    <>
    <Navbar user={user}/>
    <div className="login">
      <div className="container">
        <form >
          <h1>Sign In</h1>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email or phone number"
          />
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
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
    </>
  );
};

export default Login;
