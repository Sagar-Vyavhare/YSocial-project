import React, { useEffect, useState } from "react";
import FriendPostComponent from "./FriendPostComponent";
import PostComponent from "./NewPostComponent";
import axios from "axios";

export default function UserPosts() {
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
    <div>
      <PostComponent />
      {posts.map((d, k) => {
        return <FriendPostComponent User_data={d} key={k} />;
      })}
    </div>
  );
}
