import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import  LoginComponent from '../common/LoginComponent'
import SignUp from "../common/SignUpComponent";
import UserComponent from "../user/UserComponent";
import PostComment from '../user/PostComment';
import Navbar from '../user/NavbarComponent';
import AdminComponent from '../admin/AdminComponent';
export default function CommonComponenet() {
  return (
    <Router>
      <Routes>
        <Route path="">
          <Route path="" Component={LoginComponent} />
          <Route path="signup" Component={SignUp} />
        </Route>
        <Route exact path="user" Component={Navbar}>
          <Route path="" Component={UserComponent} />
          <Route
            path="post-comment/:id"
            Component={PostComment}
          />
        </Route>
        <Route exact path="admin">
          <Route path="" Component={AdminComponent} />
        </Route>
        <Route path="*">
          <Route path="" Component={AdminComponent} />
        </Route>
      </Routes>
    </Router>
  );
}
