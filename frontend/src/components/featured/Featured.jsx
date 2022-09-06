import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import React from "react";
import "./featured.scss";

function Featured({type}) {



  return (
    <div className="featured">
        {type &&(
            <div className="category">
                <span>{type === 'movie'? 'movies' : "series"}</span>
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
        src="https://sportshub.cbsistatic.com/i/2021/09/16/15cf5b2d-38cc-4a83-a2ff-d24bffd13dfb/finch-chappie.jpg"
        alt=""
      />
      <div className="info">
        <img src="https://occ-0-1001-768.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABdNRNPQ7K5qwXuXBIqrludM9zzie5e6TQjzfkm5-9fxSYaMow7HfLzPXR3qrngqXNNt7YSsv0vhH8ugVuCQwLkmsbnmEstDaBAzzk5Hrv2Gz.png?r=506" alt="" />
        <span className="desc">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat optio
          delectus sit maiores cumque tempore esse deleniti debitis deserunt
          ipsum magnam doloribus omnis officiis itaque eum, blanditiis unde
          incidunt necessitatibus!
        </span>
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
