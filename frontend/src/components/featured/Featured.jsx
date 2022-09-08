import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./featured.scss";
const axios = require("axios").default

function Featured({type}) {
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

console.log(content)

  return (
    <div className="featured">
        {type &&(
            <div className="category">
                <span>{type === 'movies'? 'movies' : "series"}</span>
                <select name="ganre" id="ganre">
                    <option >Ganre</option>
                    <option value="advanture">Advanture</option>
                    <option value="comedy">Comedy</option>
                    <option value="advanture">Crime</option>
                    <option value="advanture">Fantasy</option>
                    <option value="advanture">Historical</option>
                    <option value="advanture">Horror</option>
                    <option value="advanture">Romance</option>
                    <option value="advanture">Sci-fi</option>
                    <option value="advanture">Thriller</option>
                    <option value="advanture">Western</option>
                    <option value="advanture">Animation</option>
                    <option value="advanture">Drama</option>
                    <option value="advanture">Documentary</option>
                </select>
            </div>
        )}
      <img
        src={content.img}
        alt=""
      />
      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc">{content.descr}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
