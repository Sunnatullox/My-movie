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
    const res = await axios.get("https://evening-hamlet-96260.herokuapp.com/api/movies", {
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
    const res = await axios.post("https://evening-hamlet-96260.herokuapp.com/api/movies",movie, {
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
    const res = await axios.post("https://evening-hamlet-96260.herokuapp.com/api/movies",movie, {
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
    await axios.delete("https://evening-hamlet-96260.herokuapp.com/api/movies/" + id, {
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
