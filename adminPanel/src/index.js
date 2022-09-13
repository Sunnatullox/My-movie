import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { ListContextProvider } from "./context/listContext/ListContext";
import { MoviesContextProvider } from "./context/movieContext/MoviesContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MoviesContextProvider>
        <ListContextProvider>
        <App />
        </ListContextProvider>
      </MoviesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
