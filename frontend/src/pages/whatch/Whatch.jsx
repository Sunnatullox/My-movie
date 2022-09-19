import { ArrowBackOutlined, PlayArrow, Videocam } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spiner from "../../components/spiner/Spiner";
import "./whatch.scss";
import axios from "axios";
import Footer from "../../components/footer/Footer";

const Whatch = (props) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [watchTrailer, setWatchTrailer] = useState(false);
  const userSubscribeDay = JSON.parse(localStorage.getItem("user")).user.userSubscribeDay;

  const movieId = props.match.params?.id;

  const hanleMovie = async () => {
    try {
      const res = await axios.get(
        "https://evening-hamlet-96260.herokuapp.com/api/movies/find/" + movieId,
        {
          headers: {
            Authorization:
              "Sunna " + JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      setMovie(res.data.movie);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    hanleMovie();
  }, [movieId]);

  setTimeout(() => {
    if (movie) {
      return setisLoading(false);
    } else if (!movie) {
      return setisLoading(true);
    }
  }, 3000);

  return (
    <>
      {isLoading ? (
        <Spiner />
      ) : (
        <>
          <div className="containerMovie">
            <div className="whatch">
              <Link to="/" className="link">
                <div className="back">
                  <ArrowBackOutlined />
                  Home
                </div>
              </Link>
            </div>
            <div className="movie-card">
              <div className="container">
                <img src={movie?.imgSm} alt="cover" className="cover" />
                <div className="hero">
                  <img src={movie.img} className="heroImg" alt="" />
                  <div className="linegra">
                    <div className="details">
                      <div className="title1">
                        {movie?.title} <span>{movie?.limit}+</span>
                      </div>

                      <div className="title2">{movie.year} year</div>

                      <fieldset className="rating">
                        <input
                          type="radio"
                          id="star5"
                          name="rating"
                          value="5"
                        />
                        <label
                          className="full"
                          htmlFor="star5"
                          title="Awesome - 5 stars"
                        ></label>
                        <input
                          type="radio"
                          id="star4half"
                          name="rating"
                          value="4 and a half"
                        />
                        <label
                          className="half"
                          htmlFor="star4half"
                          title="Pretty good - 4.5 stars"
                        ></label>
                        <input
                          type="radio"
                          id="star4"
                          name="rating"
                          value="4"
                        />
                        <label
                          className="full"
                          htmlFor="star4"
                          title="Pretty good - 4 stars"
                        ></label>
                        <input
                          type="radio"
                          id="star3half"
                          name="rating"
                          value="3 and a half"
                        />
                        <label
                          className="half"
                          htmlFor="star3half"
                          title="Meh - 3.5 stars"
                        ></label>
                        <input
                          type="radio"
                          id="star3"
                          name="rating"
                          value="3"
                        />
                        <label
                          className="full"
                          htmlFor="star3"
                          title="Meh - 3 stars"
                        ></label>
                        <input
                          type="radio"
                          id="star2half"
                          name="rating"
                          value="2 and a half"
                        />
                        <label
                          className="half"
                          htmlFor="star2half"
                          title="Kinda bad - 2.5 stars"
                        ></label>
                        <input
                          type="radio"
                          id="star2"
                          name="rating"
                          value="2"
                        />
                        <label
                          className="full"
                          htmlFor="star2"
                          title="Kinda bad - 2 stars"
                        ></label>
                        <input
                          type="radio"
                          id="star1half"
                          name="rating"
                          value="1 and a half"
                        />
                        <label
                          className="half"
                          htmlFor="star1half"
                          title="Meh - 1.5 stars"
                        ></label>
                        <input
                          type="radio"
                          id="star1"
                          name="rating"
                          value="1"
                        />
                        <label
                          className="full"
                          htmlFor="star1"
                          title="Sucks big time - 1 star"
                        ></label>
                        <input
                          type="radio"
                          id="starhalf"
                          name="rating"
                          value="half"
                        />
                        <label
                          className="half"
                          htmlFor="starhalf"
                          title="Sucks big time - 0.5 stars"
                        ></label>
                      </fieldset>

                      <span className="likes">109 likes</span>
                      <div className="column2">
                        <p>{movie.descr}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="description">
                  <div className="column1">
                    <span className="tag">{movie.genre}</span>
                  </div>
                  <div className="fullVideo">
                    <button
                      onClick={() => setWatchTrailer(false)}
                      className="btn btn--green trailer"
                    >
                      Trailer <Videocam className="icon" />
                    </button>
                      <Link to={!userSubscribeDay && "/pricing"}>
                    <button
                      onClick={() => setWatchTrailer(true)}
                      className="btn btn--green trailer"
                    >
                        Watch Full Movie <PlayArrow className="icon" />
                    </button>
                      </Link>
                    {watchTrailer ? (
                      <>
                        {userSubscribeDay !== "" && (
                      <video
                        className="video"
                        src={movie.video}
                        progress={movie.video?.toString()}
                        controls
                        /> 
                        )}
                        </>
                    ) : (
                      <video
                        className="video"
                        src={movie.trailer}
                        progress={movie.video?.toString()}
                        controls
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Whatch;
