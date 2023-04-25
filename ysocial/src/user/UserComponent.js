import React, { useEffect, useState } from "react";
import FriendPostComponent from "./FriendPostComponent";
import PostComponent from "./NewPostComponent";
import SideBarComponent from "./SideBarComponent";
import "./UserComponent.css";
import axios from "axios";

export default function UserComponent() {
  // to store user post
  const [posts, setposts] = useState([]);

  useEffect(() => {
    getAllPost();
  }, []);
  // to get all user posts
  const getAllPost = () => {
    axios
      .get("http://localhost:9090/api/post")
      .then((resp) => setposts(resp.data));
  };
  return (
    <>
      <div className="user-container">
        <aside>
          <SideBarComponent />
        </aside>
        <section className="leftside">
          <PostComponent />
          {posts.map((d, k) => {
            return <FriendPostComponent User_data={d} key={k} />;
          })}
        </section>
      </div>
    </>
  );
}
