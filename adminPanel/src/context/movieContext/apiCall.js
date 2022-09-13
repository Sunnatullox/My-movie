import {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
} from "./MoviesActions";
import axios from "axios";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());

  try {
    const res = await axios.get("http://localhost:5000/api/movies", {
      headers: {
        Authorization:
          "Sunna " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (error) {
    dispatch(getMoviesFailure(error));
  }
};

// Create

export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try {
    const res = await axios.post("http://localhost:5000/api/movies",movie, {
      headers: {
        Authorization:
          "Sunna " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (error) {
    dispatch(createMovieFailure(error));
  }
};

// Update

export const updateMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try {
    const res = await axios.post("http://localhost:5000/api/movies",movie, {
      headers: {
        Authorization:
          "Sunna " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (error) {
    dispatch(createMovieFailure(error));
  }
};

// delete

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());

  try {
    await axios.delete("http://localhost:5000/api/movies/" + id, {
      headers: {
        Authorization:
          "Sunna " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (error) {
    dispatch(deleteMovieFailure(error));
  }
};
