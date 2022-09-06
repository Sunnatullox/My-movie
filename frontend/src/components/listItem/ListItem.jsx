import React, { useState } from "react";
import "./listitem.scss";
import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";

const ListItem = ({ index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [moviPlayed, setMoviPlayed] = useState(false);
  const triler =
    "https://vod-progressive.akamaized.net/exp=1662461291~acl=%2Fvimeo-transcode-storage-prod-us-west1-h264-540p%2F01%2F97%2F4%2F100486427%2F269725381.mp4~hmac=35fc99e225d52d0643e9491f09dfb652aa58b1bf2152380222de92233069efc9/vimeo-transcode-storage-prod-us-west1-h264-540p/01/97/4/100486427/269725381.mp4";

    
  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 235 - 45 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/05/tom-cruise-poster-for-top-gun-maverick-cropped.jpg"
        alt=""
      />
      {isHovered && ( 
        <>
          <video src={triler} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon"/>
              <Add className="icon"/>
              <ThumbUpAltOutlined className="icon"/>
              <ThumbDownAltOutlined className="icon"/>
            </div>
            <div className="itemInfoTop">
              <span>1 hour 14 min</span>
              <span className="limit">+16</span>
              <span>2010</span>
            </div>
            <div className="desc">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus dolores atque dolore corrupti cupiditate quasi
              dolorem magni veritatis?
            </div>
            <div className="genre">Action</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListItem;
