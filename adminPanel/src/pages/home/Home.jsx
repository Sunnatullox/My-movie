import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
const axios = require("axios").default

export default function Home() {
  const [userState, setUserState] = useState([]);

  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],[]);

  useEffect(() => {
    const getState = async () => {
      try {
        const res = await axios.get("https://evening-hamlet-96260.herokuapp.com/api/users/stats", {
          headers: {
            Authorization:
            "Sunna " + JSON.parse(localStorage.getItem("user")).token,
          },
        });
        const statsList = res.data.sort((a,b) => {
          return a._id - b._id
        })
        statsList.map((item) =>
          setUserState((prev) => [...prev, { name: MONTHS[item._id - 1], "New User": item.total }])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getState();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userState} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
