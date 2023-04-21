import React, {useEffect, useRef, useState } from "react";
import google from "../images/google.png";
import facebook from "../images/facebook.png";
import twitter from "../images/twitter.png";
import "./LoginComponent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {


useEffect(() => {
  // userAllreadyLogin();
}, [])
  
  
  // function userAllreadyLogin() {
  //   if (localStorage.getItem !== null) {
  //     navigate("user");
  //   }
  // }


  // states
  const [namemsgHidden, setnamemsgHidden] = useState(true);
  const [passmsgHidden, setpassmsgHidden] = useState(true);
  const [cardHidden, setcardHidden] = useState(true);

  // to send user to different component
  const navigate = useNavigate();

  // to validate form
  const username = useRef();
  const password = useRef();
  function validate() {
    let uname = username.current.value;
    let upass = password.current.value;
    let obj = { username: uname, password: upass };
    if (uname !== "" && upass !== "") {
      axios({
        url: "http://localhost:9090/api/login",
        method: "post",
        data: obj,
        contentType: "application/json",
      }).then((resp) => {
        if (resp.data.user_type === "") {
          setcardHidden(false);
          setTimeout(() => {
            setcardHidden(true);
          }, 3000);
        } else {
          if (resp.data.user_type === "user") {
            localStorage.setItem("user_id", resp.data.user_id);
            navigate("user");
          }
          else {
            navigate("admin");
          }
        }
      });
    } else {
      if (uname === "") {
        setnamemsgHidden(false);
      }
      if (upass === "") {
        setpassmsgHidden(false);
      }
    }
  }

  return (
    <div>
      <div className="card" hidden={cardHidden}>
        <div className="card-header">
          <h2>Error</h2>
        </div>
        <div className="card-body">
          <h3>Check your username or password</h3>
        </div>
      </div>
      <div className="login-container">
        <h1>Sign In</h1>
        <p>Please Login Here</p>
        <div>
          <form className="login-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="UserName"
                ref={username}
                onClick={() => setnamemsgHidden(true)}
              />
              <br />
              <span hidden={namemsgHidden}>Please enter username</span>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Password"
                ref={password}
                onClick={() => setpassmsgHidden(true)}
              />
              <br />
              <span hidden={passmsgHidden}>Please enter password</span>
            </div>
            <input type="button" value="Log In" onClick={validate} />
          </form>
        </div>
        <p className="create-account" onClick={() => navigate("/signup")}>
          Create Account
        </p>
        <div className="login-through">
          <img src={google} width="15rem" alt="goolge img" />
          <img src={facebook} width="15rem" alt="facebook img" />
          <img src={twitter} width="15rem" alt="twitter img" />
        </div>
      </div>
    </div>
  );
}
