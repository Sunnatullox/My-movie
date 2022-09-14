import React, { useEffect, useState } from "react";
import "./listitem.scss";
import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
const axios = require("axios").default;

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [moviPlayed, setMoviPlayed] = useState(false);
  const [movie, setMovie] = useState({});


  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/movies/find/" + item,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Sunna " +
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE3ZWZjOTRiNjg5NTQ4ZDVkMDMyNWEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NjI2MDkxNzl9.Bd1APD-phRJb9oyinEiDQprqQctKjBFon_v45plbR-M",
            },
          }
        );

        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMovie()
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

  {
    isHovered && handlePlayMove();
  }
  

  return (
    <Link to={{pathname:"/watch", movie:movie}}>
    <div
      className="listItem"
      style={{ left: isHovered && index * 235 - 45 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={movie.img} alt="" />
      {isHovered && (
        <>
          {moviPlayed && <video playsinline src={movie.trailer} autoPlay={true} loop />}
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownAltOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">{movie.descr.slice(0, 100)}. . . . .</div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
    </Link>
  );
};

export default ListItem;
