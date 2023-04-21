import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "../admin/AdminComponent";
import LoginComponent from "../login_and_signup/LoginComponent";
import SignUpComponent from "../login_and_signup/SignUpComponent";
import UsersComponent from "../user/UsersComponent";

export default function ComonComponent() {
  return (
    <div>
      <Router>
        <Routes>
          {/* route for sign in and sign up  */}
          <Route path="">
            <Route path="" Component={LoginComponent} />
            <Route path="sign_up" Component={SignUpComponent} />
          </Route>

          {/* route for admin  */}
          <Route path="admin" Component={Admin}></Route>

          {/* route for users  */}
          <Route path="user" Component={UsersComponent}></Route>
        </Routes>
      </Router>
    </div>
  );
}
