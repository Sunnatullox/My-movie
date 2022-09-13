import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./featured.scss";
const axios = require("axios").default

function Featured({type, setGenre}) {
const [content, setContent] = useState({})

useEffect(() => {
  const getRandomContent =  async()=>{
    try {
      const res = await axios.get(`http://localhost:5000/api/movies/randam?type=${type}`,{
        headers: {
          Authorization:"Sunna "+ "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE3ZWZjOTRiNjg5NTQ4ZDVkMDMyNWEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NjI2MDkxNzl9.Bd1APD-phRJb9oyinEiDQprqQctKjBFon_v45plbR-M",
        },
      });
      setContent(res.data[0])
    } catch (error) {
      console.log(error)
    }
  }
  getRandomContent()
}, []);;

  return (
    <div className="featured">
        {type &&(
            <div className="category">
                <span>{type === 'movies'? 'movies' : "series"}</span>
                <select name="ganre" id="ganre" onChange={e => setGenre(e.target.value)}>
                    <option value=" ">Ganre</option>
                    <option value="advanture">Advanture</option>
                    <option value="action">Action</option>
                    <option value="animation">Animation</option>
                    <option value="drama">Drama</option>
                    <option value="documentary">Documentary</option>
                    <option value="comedy">Comedy</option>
                    <option value="crime">Crime</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="historical">Historical</option>
                    <option value="horror">Horror</option>
                    <option value="romance">Romance</option>
                    <option value="religious">Religious</option>
                    <option value="sci-fi">Sci-fi</option>
                    <option value="thriller">Thriller</option>
                    <option value="western">Western</option>
                </select>
            </div>
        )}
        
      <img
        src={content.img}
        alt=""
        className="pageImg"
      />
      <div className="info">
        {content.imgTitle && (
          <img src={content?.imgTitle} alt="" />
        )}
        <span className="desc">{content.descr?.slice(0, 200)}. . .</span>
        <div className="buttons">
            <Link   className="play" to={{pathname:"/watch", movie:content}}>
            <PlayArrow />
              <span>
                Play
                </span> 
               </Link>
          <Link to={{pathname:"/movieInfo", movieInfo:content}} className="more">
            <InfoOutlined />
            <span>Info</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Featured;
