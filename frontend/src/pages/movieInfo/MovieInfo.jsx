import React from "react";
import { useLocation } from "react-router-dom";
import "./movieInfo.scss";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import Navbar from '../../components/navbar/Navbar'
import Footer from "../../components/footer/Footer";

const MovieInfo = () => {
  const { user } = useContext(AuthContext);
    const location = useLocation()
    const movieInfo = location.movieInfo

  return (
    <>
    <Navbar  user={user}/>
    <div>
      <div className="movie_card" id="tomb">
        <div className="info_section">
          <div className="movie_header">
            <img
              className="locandina"
              src={movieInfo.img}
            />
            <h1>{movieInfo.title}</h1>
            <h4>{movieInfo.year} Year</h4>
            <span className="minutes">{movieInfo.limit} +</span>
            <p className="type">{movieInfo.genre}</p>
          </div>
          <div className="movie_desc">
            <p className="text">{movieInfo.descr}</p>
          </div>
        </div>
            <img src={movieInfo.imgSm} alt=""className="blur_back tomb_back" />
      </div>
    </div>
    <Footer />
    </>
  );
};

export default MovieInfo;
