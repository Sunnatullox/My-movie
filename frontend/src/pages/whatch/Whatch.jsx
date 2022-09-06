import { ArrowBackOutlined } from "@material-ui/icons";
import React from "react";
import "./whatch.scss";

const Whatch = () => {


    const video = 'https://vod-progressive.akamaized.net/exp=1662470179~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1450%2F0%2F7250827%2F11237376.mp4~hmac=740552d7a8637d2e6dd5fd10fa8ef1f7b20b2a1d3464a680aa42b8b6e12d499e/vimeo-prod-skyfire-std-us/01/1450/0/7250827/11237376.mp4'


  return (
    <div className="whatch">
      <div className="back">
        <ArrowBackOutlined />
        Home
      </div>
      <video className="video" src={video} autoPlay progress controls />
    </div>
  );
};

export default Whatch;
