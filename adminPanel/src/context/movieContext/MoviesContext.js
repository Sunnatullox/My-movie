import MoviesReducer from "./MoviesReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  movies:[],
  isFetching: false,
  error: false,
};

export const MoviesContext = createContext(INITIAL_STATE);

export const MoviesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MoviesReducer, INITIAL_STATE);

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
