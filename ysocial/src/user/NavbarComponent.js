import React, { useContext, useEffect } from "react";
import search from "../images/search.svg";
import bell from "../images/bell-ring.png";
import profile from "../images/profile.png";
import setting from "../images/setting.png";
import exit from "../images/exit.png";
import './NavbarComponent.css'
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import data from "../context/GlobalData";
export default function Navbar() {
  const navigate = useNavigate();
  const GlobalData = useContext(data)
  useEffect(() => {
      userDetails();
      if (localStorage.getItem("user_id")===null) {
        navigate("/")
      }
    }, [])
  
  function userDetails() {
    axios({
      url: "http://localhost:9090/api/users/" + localStorage.getItem("user_id"),
      method: "get",
      contentType: "application/json",
    }).then((resp) => {
      GlobalData.setUserData(resp.data);
    });
  }
  
    function logOut() {
        localStorage.removeItem("user_id");
        navigate("/")
    }
  return (
    <>
      <div className="navbar">
        <h2 className="brand" onClick={() => navigate("/user")}>
          YSocial
        </h2>
        <div className="search-bar">
          <img src={search} alt="search" />
          <input type="search" placeholder="Search here..." />
        </div>
        <div className="images">
          <img src={bell} alt="bell" />
          <img
            src={
              GlobalData.userData.user_photo === null
                ? profile
                : GlobalData.userData.user_photo
            }
            alt="profile"
          />
          <img src={setting} alt="setting" />
          <img src={exit} alt="exit" onClick={logOut} />
        </div>
      </div>
      <Outlet />
    </>
  );
}
