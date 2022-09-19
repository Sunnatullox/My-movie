import List from "../../components/list/List";
import React, { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import "./home.scss";
import Footer from "../../components/footer/Footer";
import Spiner from "../../components/spiner/Spiner";
const axios = require("axios").default;

function Home({ types }) {
  const { user } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  const getRandom = async () => {
    try {
      const res = await axios.get(
        `https://evening-hamlet-96260.herokuapp.com/api/lists${
          types ? "?type=" + types : ""
        }${genre ? "&genre=" + genre : ""}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Sunna " + JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      setLists(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRandom();
  }, [types, genre]);

  setTimeout(() => {
    if (lists) {
      return setisLoading(false);
    } else if (!lists) {
      return setisLoading(true);
    }
  }, 5000);

  return (
    <>
      {isLoading ? (
        <Spiner />
      ) : (
        <>
          <Navbar user={user} />
          <div className="home">
            <Featured type={types} setGenre={setGenre} />
            {lists.map((list, i) => (
              <List key={i} list={list} />
            ))}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
