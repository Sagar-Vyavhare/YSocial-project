import React, { useContext, useEffect, useRef, useState } from "react";
import profile from "../images/profile.png";
import flower from "../images/flower.jpg";
import afterLike from "../images/after-like.png";
import like from "../images/like.png";
import afterDislike from "../images/after-dislike.png";
import dislike from "../images/dislike.png";
import "./FriendPostComponent.css";
import send from "../images/send.png";
import "./PostComment.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import data from "../context/GlobalData";
import CommentReply from "./CommentReply";
export default function PostComments2() {
  const [descToggle, setDescToggle] = useState("hide");
  const [likeimg, setLikeImg] = useState(like);
  const [disLikeimg, setDisLikeImg] = useState(dislike);
  const [commentId, setCommentId] = useState();
  const [postcomment, setPostcomment] = useState();

  // to store pos data
  const [post, setPost] = useState([]);
    const {id}=useParams();
  // toggle post comment and comment reply
  const [toggler, setTogler] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:9090/api/post/${id}`).then((resp) => {
      setPost(n=>n=resp.data);
    });
    console.log(post);
    getPostData();
  }, []);

  const getPostData = () => {
    //    console.log(post);
  };

  return (
    <>
          
                   <div
                     className="posts-container"
                     style={{ margin: "0 auto" }}
                   >
                     <div className="header">
                       <div className="details">
                         <div>
                           {/* <img src={post.user_details.user_photo} alt="" /> */}
                         </div>
                         <div>
                           <h4>
                             {/* {post.user_details.first_name +
                               " " +
                               post.user_details.last_name} */}
                           </h4>
                           <h6>{post.post_date}</h6>
                         </div>
                       </div>
                       <div className="about-post">
                         <h2>{post.post_title}</h2>
                         <p className={descToggle}>{post.post_description}</p>
                         <h5
                           className="toggler"
                           onClick={
                             descToggle === "hide"
                               ? () => setDescToggle("more")
                               : () => setDescToggle("hide")
                           }
                         >
                           ... {descToggle == "hide" ? "More" : "Less"}
                         </h5>
                       </div>
                     </div>
                     <div className="body">
                       <img src={post.photo} alt="" />
                     </div>
                     <div className="footer">
                       <div className="give-like">
                         <img
                           src={likeimg}
                           onClick={
                             likeimg == like
                               ? () => setLikeImg(afterLike)
                               : () => setLikeImg(like)
                           }
                           width="20rem"
                           alt=""
                         />
                         <img
                           src={disLikeimg}
                           onClick={
                             disLikeimg == dislike
                               ? () => setDisLikeImg(afterDislike)
                               : () => setDisLikeImg(dislike)
                           }
                           width="20rem"
                           alt=""
                         />
                         <img src={send} width="20rem" alt="" />
                       </div>
                     </div>
                   </div>;
           
    </>
  );
}
