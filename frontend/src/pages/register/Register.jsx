import React, { useState } from "react";
import "./register.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../../components/footer/Footer";
import {
  BatteryChargingFull,
  OndemandVideo,
  Whatshot,
} from "@material-ui/icons";

const Register = () => {
  const [registerid, setRegisterid] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const handleStart = (e) => {
    e.preventDefault();
    if (email) {
      return setRegisterid(true);
    } else {
      toast.error("Sorry, you did not enter your email");
    }
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    if (name && password && email) {
      try {
        await axios.post(
          "https://evening-hamlet-96260.herokuapp.com/api/auth/register",
          {
            email,
            name,
            password,
          }
        );
        return history.push("/login");
      } catch (error) {
        toast.error(error.response.data.msg);
        return;
      }
    } else {
      return toast.error("Sorry, you did not enter username or password");
    }
  };



  return (
    <>
      <Navbar user={user}/>
      <div className="register">
        <ToastContainer />
        <div className="container">
          <h1>Unlimite movies, TV showa, and more</h1>
          <h2>Whatch anywhere. Cancel anytime</h2>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          {!registerid ? (
            <div className="input">
              <input
                type="email"
                className="form-control is-invalid"
                aria-describedby="basic-addon1"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email adress"
                required
              />
              <button onClick={handleStart} className="btn registerButton">
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
      <div id="page-wrapper">
        <div className="container">
          <section id="features">
            <div className="grid">
              <div className="icon">
                <Whatshot style={{ fontSize: "65px" }} />
              </div>

              <div className="desc">
                <h2>Unlimited movies, TV shows and more</h2>
                <p>
                  Watch unlimited streaming videos, movies and more anytime,
                  anywhere from any streaming device.
                </p>
              </div>
            </div>

            <div className="grid">
              <div className="icon">
                <OndemandVideo style={{ fontSize: "65px" }} />
              </div>

              <div className="desc">
                <h2>Enjoy on your TV</h2>
                <p>
                  Watch on smart TVs, Playstation, XBox, Chromcast, AppleTv,
                  Blue-ray players and more.
                </p>
              </div>
            </div>

            <div className="grid">
              <div className="icon">
                <BatteryChargingFull style={{ fontSize: "65px" }} />
              </div>

              <div className="desc">
                <h2>Download your shows to watch offline</h2>
                <p>
                  Save your favourites easily and always have something to
                  watch.
                </p>
              </div>
            </div>
          </section>

          <section id="how-it-works">
            <video
              className="video"
              controls
              src="https://firebasestorage.googleapis.com/v0/b/my-movie-548bd.appspot.com/o/items%2F8b6a2215-14ed-48a8-9b8d-f0c1d6eb128d-Top%20Gun_%20Maverick%20-%20Official%20Trailer%20(2022)%20-%20Paramount%20Pictures.mp4?alt=media&token=871090d9-6d86-475e-9db1-012a20939679"
            ></video>
          </section>

          <section id="pricing">
            <div className="product" id="basic">
              <div className="level">Basic</div>
              <h2>$6</h2>
              <ol>
                <li>Watch on your laptop</li>
                <li>Watch on your mobile phone</li>
                <li>Unlimited movies and TV shows</li>
                <li>Cancel anytime</li>
              </ol>

              <button onClick={() => toast.error("please register first")} className="btn">Select</button>
            </div>

            <div className="product" id="standard">
              <div className="level">Standard</div>
              <h2>$9</h2>
              <ol>
                <li>HD available</li>
                <li>Watch on your mobile phone</li>
                <li>Unlimited movies and TV shows</li>
                <li>Cancel anytime</li>
              </ol>

              <button onClick={() => toast.error("please register first")} className="btn">Select</button>
            </div>

            <div className="product" id="premium">
              <div className="level">Premium</div>
              <h2>$12</h2>
              <ol>
                <li>Ultra HD available</li>
                <li>4 screens at once</li>
                <li>Unlimited movies and TV shows</li>
                <li>Cancel anytime</li>
              </ol>

              <button onClick={() => toast.error("please register first")} className="btn">Select</button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
