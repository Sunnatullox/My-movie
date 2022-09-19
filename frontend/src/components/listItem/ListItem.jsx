import React, { useContext, useEffect, useState } from "react";
import "./listitem.scss";
import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
const axios = require("axios").default;

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [moviPlayed, setMoviPlayed] = useState(false);
  const [movie, setMovie] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function getMovie() {
      try {
        const res = await axios.get(
          "https://evening-hamlet-96260.herokuapp.com/api/movies/find/" + item,
          {
            headers: {
              Authorization:
                "Sunna " + JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );
        const newUser = res.data.user;
        localStorage.clear("user")
        localStorage.setItem("user", JSON.stringify({...user,user:newUser}))
        setMovie(res.data.movie);
      } catch (error) {
        console.log(error);
      }
    }
    getMovie();
  }, [item]);

  const handlePlayMove = () => {
    if (isHovered) {
      setTimeout(() => {
        setMoviPlayed(true);
      }, 500);
    } else if (!isHovered) {
      setMoviPlayed(false);
    }
  };

  setTimeout(() => {
    isHovered && handlePlayMove();
  }, 500);

  return (
    <Link to={`/watch/${movie._id}`}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 235 - 45 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="" />
        {isHovered && (
          <>
            {moviPlayed && (
              <video
                playsinline
                src={movie.trailer}
                autoPlay={true}
                loop
                playsInline
              />
            )}
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownAltOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">{movie.limit}+</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.descr?.slice(0, 100)}. . . . .</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
