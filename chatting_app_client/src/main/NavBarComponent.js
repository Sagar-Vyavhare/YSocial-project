import React, { useEffect, useState } from "react";
import "./NavBarComponent.css";
import menu from "../Images/navigation.png";
import user from "../Images/user.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NavBarComponent() {

const navigate= useNavigate()


  const [userDetails, setUserDetails] = useState([]);
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("user_id") == null) {
      navigate("/")
    }
    getUserDetails();
  }, []);
  const logOut = () => {
    localStorage.removeItem("user_id");
    navigate("/")
}
  const getUserDetails = () => {
    axios({
      url: "http://localhost:9090/api/users/" + localStorage.getItem("user_id"),
      method: "get",
      contentType: "application/json",
    }).then((resp) => {
      console.log(resp.data);
      setUserDetails(resp.data);
    });
  };

  return (
  
      <nav>
        <div className="nav-container">
          <h1>Chatting app</h1>
          <img
            src={menu}
            width="38px"
            className="menu-bar"
            alt="menu icon"
            onClick={() => setIsHidden(!isHidden)}
          />
          <div className="menu" hidden={isHidden}>
            <div className="menu-items">
              <div className="menu-header">
                <img
                  src={
                    userDetails.user_photo === null ||
                    userDetails.user_photo === ""
                      ? user
                      : userDetails.user_photo
                  }
                  width="38px"
                  alt="user"
                />
                <div>
                  <h4>{userDetails.user_name}</h4>
                  <button className="edit-btn">Edit profile</button>
                </div>
              </div>
              <div className="menu-body">
                <p>Setting</p>
                <p onClick={() => logOut()}>Log out</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

  );
}
