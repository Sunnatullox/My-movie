import React, { useContext, useState } from "react";
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import "./navbar.scss";
import AppLogo from "../../image/My_Movie-removebg-preview.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logoutStart } from "../../authContext/AuthAction";

function Navbar({ user }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searching, setSearching] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const userLocalstorage = localStorage.getItem("user");
  const userinfo = JSON.parse(userLocalstorage)?.user;
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };


  return (
    <div className={isScrolled ? "navbars scrolled" : "navbars"}>
      <div className="containers">
        <div className="left">
          <Link to="/">
            <img src={AppLogo} className="logo" alt="" />
          </Link>
        </div>
        {user ? (
          <>
            <div className="left">
              <Link to="/" className="link">
                <span>Homepage</span>
              </Link>
              <Link to="/series" className="link">
                <span className="navbarMainLinks">Service</span>
              </Link>
              <Link to="/movies" className="link">
                <span className="navbarMainLinks">Movies</span>
              </Link>
              <span>New and Popular</span>
              <span>My List</span>
            </div>
            <div className="right">
              <input type="text" className={searching ? "d-block form-control" :"d-none"}  id="search" placeholder="Search..." />
               <Search className="icon" onClick={() => setSearching(!searching)}/>
              <span>KID</span>
              <Notifications className="icon" />
              {userinfo?.profilePic === "" ? (
                <Link to="/myProfile">
                  <img
                    src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                    alt={userinfo?.name}
                  />
                </Link>
              ) : (
                <Link to="/myProfile">
                  <img src={userinfo?.profilePic} alt={userinfo?.name} />
                </Link>
              )}
              <div className="profile">
                <ArrowDropDown className="icon" />
                <div className="options">
                  <Link to="/myProfile">Profile</Link>
                  <span onClick={() => dispatch(logoutStart())}>LogOut</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Link to="/login" className="loginbutton">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
