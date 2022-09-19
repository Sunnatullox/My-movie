import { Close, Done, MeetingRoom, Style, TabletMac } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./pricing.scss";

const MySwal = withReactContent(Swal);

const Pricing = () => {
  const [tabs, setTabs] = useState(0);
  const [paymentSum, setPaymentSum] = useState(null);
  const { user } = useContext(AuthContext);
  const PublishableKey =
    "pk_test_51Lj1j9CRpPBw47sJyFf7ftbkN797wWQGk1soj79GorjTWDLlMXtRlQvWDaArSpVAEK1PNHMSKyyAOdgTyON1o2BY00Ya54R9Od";
  const history = useHistory();

  let basic = {
    HD_Movies: "no",
    Ultra_HD_Movies: "no",
    nowScrensMovie: 1,
    devicesMovie: [{ laptop: "yes" }, { TV: "yes" }, { phone: "yes" }],
    traficsPlatform: "unlimited",
    cancellation: "any time",
    initial_month: "free",
    userPaymentSum: paymentSum * 100,
  };
  let standart = {
    HD_Movies: "yes",
    Ultra_HD_Movies: "no",
    nowScrensMovie: 2,
    devicesMovie: [{ laptop: "yes" }, { TV: "yes" }, { phone: "yes" }],
    traficsPlatform: "unlimited",
    cancellation: "any time",
    initial_month: "free",
    userPaymentSum: paymentSum * 100,
  };
  let premium = {
    HD_Movies: "yes",
    Ultra_HD_Movies: "yes",
    nowScrensMovie: 4,
    devicesMovie: [{ laptop: "yes" }, { TV: "yes" }, { phone: "yes" }],
    traficsPlatform: "unlimited",
    cancellation: "any time",
    initial_month: "free",
    userPaymentSum: paymentSum * 100,
  };

  let platformTrafic = {};

  if (paymentSum === "8.99") {
    platformTrafic.userPayStatus = basic;
  } else if (paymentSum === "12.99") {
    platformTrafic.userPayStatus = standart;
  } else if (paymentSum === "15.99") {
    platformTrafic.userPayStatus = premium;
  }

  const handleStripeSum = () => {
    if (paymentSum === null) {
      return toast.info("Sorry, you did not select a price");
    }
  };

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Payment was Success Fully",
      time: 4000,
    });
    history.push("/");
  };

  const payNow = async (token) => {
    try {
      const res = await axios.post(
        "https://evening-hamlet-96260.herokuapp.com/api/payment",
        {
          data: {
            platformTrafic,
            token,
            amount: platformTrafic.userPayStatus.userPaymentSum,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Sunna " + JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      if (res.status === 200) {
        localStorage.clear("user")
        const newUser = res.data
        localStorage.setItem("user", JSON.stringify({...user,user:newUser}))
        handleSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar user={user} />
      <ToastContainer />
      <div className="pricing">
        <section className="tabs">
          <div className="container">
            <div
              onClick={() => setTabs(0)}
              id="tab-1"
              className={tabs === 2 ? "tab-item tab-border" : "tab-item"}
            >
              <MeetingRoom style={{ fontSize: "5rem" }} />
              <p className="hide-sm">Cancel at any time</p>
            </div>
            <div
              onClick={() => setTabs(1)}
              id="tab-2"
              className={tabs === 1 ? "tab-item tab-border" : "tab-item"}
            >
              <TabletMac style={{ fontSize: "5rem" }} />
              <p className="hide-sm">Watch anywhere</p>
            </div>
            <div
              onClick={() => setTabs(2)}
              id="tab-3"
              className={tabs === 0 ? "tab-item tab-border" : "tab-item"}
            >
              <Style style={{ fontSize: "5rem" }} />
              <p className="hide-sm">Pick your price</p>
            </div>
          </div>
        </section>

        <section className="tab-content">
          <div className="container">
            <div
              id="tab-1-content"
              className={
                tabs === 2 ? "d-block tab-content-item show show" : "d-none"
              }
            >
              <div className="tab-1-content-inner">
                <div>
                  <p className="text-lg">
                    If you decide Netflix isn't for you - no problem. No
                    commitment. Cancel online anytime.
                  </p>
                </div>
                <img src="https://i.ibb.co/J2xDJV7/tab-content-1.png" alt="" />
              </div>
            </div>

            <div
              id="tab-2-content"
              className={
                tabs === 1 ? "d-block tab-content-item show" : "d-none"
              }
            >
              <div className="tab-2-content-top">
                <p className="text-lg">
                  Watch TV shows and movies anytime, anywhere — personalized for
                  you.
                </p>
              </div>
              <div className="tab-2-content-bottom">
                <div>
                  <img
                    src="https://www.plex.tv/wp-content/uploads/2021/05/image-avod-devices-all-may-2021-1440x872.png"
                    alt=""
                  />
                  <p className="text-md">Watch on your TV</p>
                  <p className="text-dark">
                    Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
                    players and more.
                  </p>
                </div>
                <div>
                  <img
                    src="https://www.justwatch.com/appassets/img/home/watchlist/watchlist.png"
                    alt=""
                  />
                  <p className="text-md">
                    Watch instantly or download for later
                  </p>
                  <p className="text-dark">
                    Available on phone and tablet, wherever you go.
                  </p>
                </div>
                <div>
                  <img
                    src="https://zeromolecule.com/content/images/2020/05/Group-7.png"
                    alt=""
                  />
                  <p className="text-md">Use any computer</p>
                  <p className="text-dark">Watch right on Netflix.com.</p>
                </div>
              </div>
            </div>

            <div
              id="tab-3-content"
              className={
                tabs === 0 ? "d-block tab-content-item show" : "d-none"
              }
            >
              <div className="text-center">
                <p className="text-lg">
                  Choose one plan and watch everything on Netflix.
                </p>

                {paymentSum === null ? (
                  <>
                    <button
                      className="btn btn-lg"
                      onClick={() => handleStripeSum()}
                    >
                      Watch free for 30 days
                    </button>
                  </>
                ) : (
                  <StripeCheckout
                    className="btn btn-lg"
                    stripeKey={PublishableKey}
                    label="Watch free for 30 days"
                    name="Pay with credit card"
                    billingAddress
                    shippingAddress
                    amount={platformTrafic.userPayStatus.userPaymentSum}
                    token={payNow}
                    description="Your Success fully payment"
                  />
                )}
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        Basic
                      </label>
                      <br />
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        onChange={(e) => setPaymentSum(e.target.value)}
                        value="8.99"
                      />
                    </th>
                    <th>
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        Standard
                      </label>
                      <br />
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        onChange={(e) => setPaymentSum(e.target.value)}
                        value="12.99"
                      />
                    </th>
                    <th>
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio3"
                      >
                        Premium
                      </label>
                      <br />
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio3"
                        onChange={(e) => setPaymentSum(e.target.value)}
                        value="15.99"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monthly price after free month ends on 6/19/19</td>
                    <td>$8.99</td>
                    <td>$12.99</td>
                    <td>$15.99</td>
                  </tr>
                  <tr>
                    <td>HD Available</td>
                    <td>
                      <Close />
                    </td>
                    <td>
                      <Done />
                    </td>
                    <td>
                      <Done />
                    </td>
                  </tr>
                  <tr>
                    <td>Ultra HD Available</td>
                    <td>
                      <Close />
                    </td>
                    <td>
                      <Close />
                    </td>
                    <td>
                      <Done />
                    </td>
                  </tr>
                  <tr>
                    <td>Screens you can watch on at the same time</td>
                    <td>1</td>
                    <td>2</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>Watch on your laptop, TV, phone and tablet</td>
                    <td>
                      <Done />
                    </td>
                    <td>
                      <Done />
                    </td>
                    <td>
                      <Done />
                    </td>
                  </tr>
                  <tr>
                    <td>Unlimited movies and TV shows</td>
                    <td>
                      <Done />
                    </td>
                    <td>
                      <Done />
                    </td>
                    <td>
                      <Done />
                    </td>
                  </tr>
                  <tr>
                    <td>Cancel anytime</td>
                    <td>
                      <Done />
                    </td>
                    <td>
                      <Done />
                    </td>
                    <td>
                      <Done />
                    </td>
                  </tr>
                  <tr>
                    <td>First month free</td>
                    <td>
                      <Done />
                    </td>
                    <td>
                      <Done />
                    </td>
                    <td>
                      <Done />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
