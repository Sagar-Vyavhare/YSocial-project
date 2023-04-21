import React, { useEffect, useState } from "react";
import profile from "../images/profile.png";
import "./FriendPostComponent.css";
import afterLike from "../images/after-like.png";
import like from "../images/like.png";
import afterDislike from "../images/after-dislike.png";
import dislike from "../images/dislike.png";
import comment from "../images/comment.png";
import send from "../images/send.png";
import { useNavigate } from "react-router-dom";
export default function FriendPostComponent({data}) {
  // to togle description
  const [descToggle, setDescToggle] = useState("hide");
  const [likeimg, setLikeImg] = useState(like);
  const [disLikeimg, setDisLikeImg] = useState(dislike);
  const [totalLikes, setTotalLikes] = useState(0);
  const [TotalDislikes, setTotalDislikes] = useState(0);

  // to navigate user
  const navigate = useNavigate();



  // to comment a post
  const postComment = (id) => {
    navigate(`post-comment/${id}`);
  };



  //to increase like of a post
  function setalike() {
console.log(data);

    if (likeimg === like) {
      setLikeImg(afterLike);
      setDisLikeImg(dislike);
      setTotalLikes(n => n + 1);
      if (disLikeimg !== dislike) {
              setTotalDislikes((n) => n - 1);

      }
    } else {
      setLikeImg(like);
      setTotalLikes((n) => n - 1);
    }
  }
  // to set dislike
  function setDisLike() {
    if (disLikeimg === dislike) {
      setDisLikeImg(afterDislike);
      setLikeImg(like);
      setTotalDislikes(n => n + 1);
      if (likeimg !== like) {
        setTotalLikes((n) => n - 1);
      }
    } else {
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
                      data.user_details.user_photo === null
                        ? profile
                        : data.user_details.user_photo
                    }
                    alt=""
                  />
                </div>
                <div>
                  <h4>
                    {data.user_details.first_name +
                      " " +
                      data.user_details.last_name}
                  </h4>
                  <h6>{data.post_date}</h6>
                </div>
              </div>
              <div className="about-post">
                <h2>{data.post_title}</h2>
                <p className={descToggle}>{data.post_description}</p>
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
              <img src={data.photo} alt="" />
            </div>
            <div className="footer">
              <div className="give-like">
                <div>
                  <img src={likeimg} onClick={setalike} width="20rem" alt="" />
                  <p>{totalLikes}</p>
                </div>
                <div>
                  <img
                    src={disLikeimg}
                    onClick={setDisLike}
                    width="20rem"
                    alt=""
                  />
                  <p>{TotalDislikes}</p>
                </div>
                <div>
                  <img
                    src={comment}
                    width="20rem"
                    alt=""
                    onClick={() => postComment(data.post_id)}
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
