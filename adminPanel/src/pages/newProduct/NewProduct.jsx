import { useState } from "react";
import "./newProduct.css";
import { storage } from "../../firebase";
// import { deleteMovieStart } from "../../context/movieContext/MoviesActions";
import { v4 } from "uuid";
import { createMovie } from "../../context/movieContext/apiCall";
import { useContext } from "react";
import { MoviesContext } from "../../context/movieContext/MoviesContext";
import { useHistory } from "react-router-dom";
import { Button } from "rsuite";
// Default CSS
import "rsuite/dist/rsuite.min.css";


export default function NewProduct() {
  const { dispatch } = useContext(MoviesContext);
  const hestory = useHistory();

  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [progress, setProgress] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const uploadTask = storage
        .ref(`items/${v4() + "-" + item.file.name}`)
        .put(item.file);
      uploadTask.on(
        "state_changes",
        (snapshot) => {
          const progres =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progres);
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (img !== null || imgTitle !== null || uploaded !== null || video !== null) {
      upload([
        { file: img, label: "img" },
        { file: imgTitle, label: "imgTitle" },
        { file: imgSm, label: "imgSm" },
        { file: trailer, label: "trailer" },
        { file: video, label: "video" },
      ]);
    }
  };

  if (uploaded === 5) {
      createMovie(movie, dispatch);
      hestory.push("/movies");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Dunyolarga nur taralgan kecha"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Movie description"
            name="descr"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Action"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="2:20 hours"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="number"
            placeholder="16"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>isSeries?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option>isSeries</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {progress !== null ? (
          <>
            <div>
              <Button loading appearance="primary" className="addProductButton">
                Loading...
              </Button>
              <div class="slider">
                <div class="slider__input">
                  <input
                    class="slider__input_slider"
                    type="range"
                    min="0"
                    max="100"
                    step="0.05"
                    value={progress}
                  />
                  <div
                    class="slider__input_tracker"
                    style={{
                      width: `${
                        progress < 50 ? progress - 0.5 : progress - 4
                      }%`,
                    }}
                  ></div>
                </div>
                <p> {Math.trunc(progress)}%</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {uploaded === 5 ? (
              <button onClick={handleSubmit} className="addProductButton">
                Create
              </button>
            ) : (
              <button onClick={handleUpload} className="addProductButton">
                Upload
              </button>
            )}
          </>
        )}
      </form>
    </div>
  );
}
