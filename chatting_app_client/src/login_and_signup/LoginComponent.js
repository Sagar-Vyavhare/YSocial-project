import axios from "axios";
import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LoginComponent.css";
export default function LoginComponent() {
  const [UserName, setUserName] = useState("input-bar");
  const [passwordvalidate, setpasswordvalidate] = useState("input-bar");

  const navigate = useNavigate();

  const txtuser = useRef();
  const txtpass = useRef();

  const validateInput = () => {
    var userValue = txtuser.current.value;
    var passValue = txtpass.current.value;
    var uservaildate =
      userValue.match(/^[\w@_-]+$/) ||
      userValue.match(/^[a-z0-9]{3,15}[@][a-z]{3,9}(\.)[a-z]{2,5}$/);

    var passValidate = passValue.match(/^[a-zA-Z0-9@#$%^&*]{8,15}$/);
    if (uservaildate && passValidate) {
      setpasswordvalidate("input-bar");
      setUserName("input-bar");
      return true;
    } else {
      if (uservaildate) {
        setUserName("input-bar");
      } else {
        setUserName("wrong-details");
      }
      if (passValidate) {
        setpasswordvalidate("input-bar");
      } else {
        setpasswordvalidate("wrong-details");
      }
      return false;
    }
  };

  const logIn = (e) => {
    e.preventDefault();
    let username = txtuser.current.value;
    let password = txtpass.current.value;

    let obj = {
      username,
      password,
    };

    axios({
      url: "http://localhost:9090/api/login",
      method: "post",
      data: obj,
      contentType: "application/json",
    })
      .then((resp) => {
        if (resp.data.user_type === "") {
          setpasswordvalidate("wrong-details");
          setUserName("wrong-details");
        } else if (resp.data.user_type === "user") {
          localStorage.setItem("user_id", resp.data.user_id);
          navigate("/user");
        } else {
          navigate("/admin");
        }
      })
      .catch((resp) => {
        console.log(resp.message);
      });
  };
  return (
    <section>
      <div className="login-container">
        <div className="container1">
          <div className="header">
            <h2>Chatting App</h2>
          </div>
          <div className="body">
            <form>
              <div className="input">
                <input
                  type="text"
                  placeholder="User name or email"
                  className={UserName}
                  ref={txtuser}
                  onFocus={() => setUserName("input-bar")}
                  required
                />
              </div>
              <div className="input">
                <input
                  type="password"
                  placeholder="password"
                  className={passwordvalidate}
                  ref={txtpass}
                  onFocus={() => setpasswordvalidate("input-bar")}
                  required
                />
              </div>
              <hr />
              <div className="button">
                <Button
                  className="btn-style"
                  onClick={(e) =>
                    validateInput()
                      ? logIn(e)
                      : setpasswordvalidate("wrong-details")
                  }
                >
                  Log In
                </Button>
              </div>
            </form>
          </div>
          <div className="sign-up">
            <h6>
              Don't have account <br />{" "}
              <span onClick={() => navigate("/sign_up")}>Create account</span>
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
}
