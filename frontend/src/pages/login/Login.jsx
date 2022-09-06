import "./login.scss";
import Logo from "../../image/My_Movie-removebg-preview.png";



const Login = () => {

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={Logo} alt="" />
        </div>
      </div>
      <div className="container">
       <form >
       <h1>Sign In</h1>
        <input type="email" placeholder="email or phone number" />
        <input type="password" placeholder="Password" />
       <button className="loginButton">Sign In</button>
       <span>New to My movie? <b>Sign Up now.</b></span>
       <small>This page is protected by Google reCaptcha to ensure you're not a bot. <b>Learn more</b>.</small>
       </form>
      </div>
    </div>
  );
};

export default Login;
