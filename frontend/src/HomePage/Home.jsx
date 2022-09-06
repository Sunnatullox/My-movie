import { List } from "@material-ui/core";
import React from "react";
import Featured from "../components/featured/Featured";
import Navbar from "../components/navbar/Navbar";
import "./home.scss";

function Home() {

  return (
    <div className="home">
      <Navbar />
      <Featured  />
      <List />
      <List />
      <List />
      <List />
    </div>
  );
}

export default Home;
