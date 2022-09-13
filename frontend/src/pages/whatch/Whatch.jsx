import { ArrowBackOutlined } from "@material-ui/icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./whatch.scss";

const Whatch = () => {

  const location = useLocation()
  const video = location.movie.video
  return (
    <div className="whatch">
      <Link to="/" className="link">
      <div className="back">
        <ArrowBackOutlined />
        Home
      </div>
    </Link>
      <video className="video" src={video} autoPlay progress controls />
    </div>
  );
};

export default Whatch;
