import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState,useEffect  } from "react";
const axios = require("axios").default

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);


  useEffect(() => {
    const getNewUsers = async() => {
      try {
        const res = await axios.get("https://evening-hamlet-96260.herokuapp.com/api/users?new=true",{
          headers: {
            Authorization:
              "Sunna " + JSON.parse(localStorage.getItem("user")).token
          },
        })
        setNewUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getNewUsers()
  }, []);
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map(user => (
        <li className="widgetSmListItem">
          <img
            src={user.profilePic || "https://pbs.twimg.com/profile_images/584361147723227137/2BuVfqNL_400x400.jpg"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.name}</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
          
        ))}
        
      </ul>
    </div>
  );
}
