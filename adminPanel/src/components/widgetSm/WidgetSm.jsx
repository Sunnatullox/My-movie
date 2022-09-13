import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState,useEffect  } from "react";
const axios = require("axios").default

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);


  useEffect(() => {
    const getNewUsers = async() => {
      try {
        const res = await axios.get("http://localhost:5000/api/users?new=true",{
          headers: {
            Authorization:
              "Sunna eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE3ZWZjOTRiNjg5NTQ4ZDVkMDMyNWEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NjI2NTY5Njd9.BoyKtSSsFxLM5Y9DNFPwF-Gib1sQqlvMRVnEeU6xMvI",
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
