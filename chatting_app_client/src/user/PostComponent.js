import axios from "axios";
import React, { useEffect, useState } from "react";
import user from "../Images/user.png";
import love from "../Images/love.png";
import like from "../Images/like.png";
import ellipsis from "../Images/ellipsis.png";
import thumb from "../Images/thumb.png";
import comment from "../Images/comment.png";
import send from "../Images/send.png";
import "./PostComponent.css";
export default function PostComponent() {
  const [imageData, SetImageData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.unsplash.com/search/photos?page=1&query=nature&client_id=JYxw7hGzznCJ62E1C7f0064eSwM7DoKfIm3PHLqqD9Q "
      )
      .then((resp) => {
        SetImageData(resp.data.results);
        console.log(resp.data.results);
      });
  }, []);
  return (
    <>
      {imageData.map((d) =>
      {
        return (
          <div className="wrapper">
            <div className="post-header">
              <div className="user-img-text">
                <img src={user} width="35px" className="user-image" />
                <div className="header-text">
                  <h3>send by user</h3>
                  <span>posted duration</span>
                </div>
              </div>
              <img src={ellipsis} width="35px" className="ellipsis" />
            </div>
            <div className="post-body">
              <img src={d.urls.raw} className="images" alt="random" />
            </div>
            <div className="post-footer">
              <div className="total">
                <div className="likes">
                  <img src={like} width="35px" className="likes-images" />
                  <img src={love} width="35px" className="likes-images" />
                  <span> 1</span>
                </div>
                <div className="post-coments">
                  <span>4 comments</span>
                  <span> .1 posts</span>
                </div>
              </div>
              <div className="like-share-button">
                <img src={thumb} width="35px" />
                <img src={comment} width="35px" />
                <img src={send} width="35px" />
              </div>
            </div>
          </div>
        );
      })}
      
    </>
  );
}
