import React, { useContext, useEffect, useState } from "react";
import profile from "../images/profile.png";
import "./FriendPostComponent.css";
import afterLike from "../images/after-like.png";
import like from "../images/like.png";
import afterDislike from "../images/after-dislike.png";
import dislike from "../images/dislike.png";
import comment from "../images/comment.png";
import send from "../images/send.png";
import { useNavigate } from "react-router-dom";
import data from "../context/GlobalData";
import axios from "axios";
export default function FriendPostComponent({ User_data }) {
  // to togle description
  const [descToggle, setDescToggle] = useState("hide");
  const [likeimg, setLikeImg] = useState(like);
  const [disLikeimg, setDisLikeImg] = useState(dislike);
  const [totalLikes, setTotalLikes] = useState(0);
  const [TotalDislikes, setTotalDislikes] = useState(0);
  const global_data = useContext(data);
  // to navigate user
  const navigate = useNavigate();
  useEffect(() => {
    getTotalLikesDislikes(); 
  }, []);

  const getTotalLikesDislikes = () => {
    let like_cnt = 0;
    let dislike_cnt = 0;
    User_data.likes_dislikes.map((d) => {
      
      if (d.is_like) {
        like_cnt++;
        if (global_data.userData.user_id === d.user_details.user_id) {
          setLikeImg(afterLike);
        }
      } else {
        dislike_cnt++;
        if (global_data.userData.user_id === d.user_details.user_id) {
          setDisLikeImg(afterDislike);
        } 
      }
    });
    setTotalLikes(like_cnt);
    setTotalDislikes(dislike_cnt);
  };

  // to comment a post
  const postComment = (id) => {
    navigate(`post-comment/${id}`);
  };

  //to increase like of a post
  function setalike() {
    console.log(User_data);
    if (likeimg === like) {
      addLike(1); 
      setLikeImg(afterLike);
      setDisLikeImg(dislike);
      setTotalLikes((n) => n + 1);
      if (disLikeimg !== dislike) {
        setTotalDislikes((n) => n - 1);
      }
    } else {
      setLikeImg(like);
      addLike(1);
      setTotalLikes((n) => n - 1);
    }
  }

  function addLike(like) {
    console.log("hello smarnika");
    let obj = {
      like_dislike_date: new Date().toLocaleDateString(),
      is_like: like,
      user_details: { user_id: global_data.userData.user_id },
      user_post: {
        post_id: User_data.post_id,
      },
    };
    axios.post("http://localhost:9090/post_like_dislike",obj);
  }
  // to set dislike
  function setDisLike() {
    if (disLikeimg === dislike) {
      addLike(0);
      setDisLikeImg(afterDislike);
      setLikeImg(like);
      setTotalDislikes((n) => n + 1);
      if (likeimg !== like) {
        setTotalLikes((n) => n - 1);
      }
    } else {
      addLike(0);
      setDisLikeImg(dislike);
      setTotalDislikes((n) => n - 1);
    }
  }
  return (
    <>
      <div className="posts-container">
        <div className="header">
          <div className="details">
            <div>
              <img
                src={
                  User_data.user_details.user_photo === null
                    ? profile
                    : User_data.user_details.user_photo
                }
                alt=""
              />
            </div>
            <div>
              <h4>
                {User_data.user_details.first_name +
                  " " +
                  User_data.user_details.last_name}
              </h4>
              <h6>{User_data.post_date}</h6>
            </div>
          </div>
          <div className="about-post">
            <h2>{User_data.post_title}</h2>
            <p className={descToggle}>{User_data.post_description}</p>
            <h5
              className="toggler"
              onClick={
                descToggle === "hide"
                  ? () => setDescToggle("more")
                  : () => setDescToggle("hide")
              }
            >
              ... {descToggle === "hide" ? "More" : "Less"}
            </h5>
          </div>
        </div>
        <div className="body">
          <img src={User_data.photo} alt="" />
        </div>
        <div className="footer">
          <div className="give-like">
            <div>
              <img src={likeimg} onClick={setalike} width="20rem" alt="" />
              <p>{totalLikes}</p>
            </div>
            <div>
              <img src={disLikeimg} onClick={setDisLike} width="20rem" alt="" />
              <p>{TotalDislikes}</p>
            </div>
            <div>
              <img
                src={comment}
                width="20rem"
                alt=""
                onClick={() => postComment(User_data.post_id)}
              />
              <p>2</p>
            </div>
            <div>
              <img src={send} width="20rem" alt="" />
              <p>5</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
