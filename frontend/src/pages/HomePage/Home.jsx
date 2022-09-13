import List from "../../components/list/List";
import React, { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import "./home.scss";
const axios = require('axios').default;

function Home({ types }) {
  const { user } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandom = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/lists${types ? "?type=" + types : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:"Sunna "+ "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE3ZWZjOTRiNjg5NTQ4ZDVkMDMyNWEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NjI2MDkxNzl9.Bd1APD-phRJb9oyinEiDQprqQctKjBFon_v45plbR-M",
            },
          }
        );
        setLists(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    getRandom();
  }, [types, genre]);
  return (
    <div className="home">
      <Navbar user={user}/>
      <Featured type={types} setGenre={setGenre}/>
      {lists.map((list, i) =>( 
        <List key={i}  list={list}/>
      ))}
    </div>
  );
}

export default Home;
