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

export default function PostComment() {
  const [descToggle, setDescToggle] = useState("hide");
  const [likeimg, setLikeImg] = useState(like);
  const [disLikeimg, setDisLikeImg] = useState(dislike);
  const [commentId, setCommentId] = useState();
  const [postcomment, setPostcomment] = useState();

  // to store pos data
  const [post, setPost] = useState([]);

  // toggle post comment and comment reply
  const [toggler, setTogler] = useState(true);

  // to store comments
  const [comments, setComments] = useState([]);

  // to store comments replies
  const [commentsReplies, setCommentsReplies] = useState([]);
  // to get global data
  const global_data = useContext(data);

  // to get path variable
  const { id } = useParams();

  // to get form data
  const comment = useRef();

  useEffect(() => {
    getPostData();
  }, []);

  // to run on component load
  useEffect(() => {
    getComments();
    getCommentReplies();
  }, []);
  const getPostData = async () => {
    await axios
      .get(`http://localhost:9090/api/post/${id}`)
      .then((resp) => {
        setPost(resp.data)
        console.log(resp.data);
      }
      );
    console.log(post);
  };
  // to send comment
  const sendComment = () => {
    let comment_message = comment.current.value;
    let obj = {
      comment_message,
      comment_date: new Date().toLocaleDateString(),
      user_details: { user_id: global_data.userData.user_id },
      user_post: { post_id: id },
    };
    if (comment_message !== "") {
      axios
        .post("http://localhost:9090/api/comment", obj)
        .then((resp) => { getComments(); comment.current.value="" });
    }
  };

  // to get comment of post
  const getComments = () => {
    axios
      .get(`http://localhost:9090/api/comment/${id}`)
      .then((resp) => setComments(resp.data));
  };

  const getCommentReplies = () => {
    axios
      .get(`http://localhost:9090/api/comment-reply`)
      .then((resp) => setCommentsReplies(resp.data));
  };

  const serReplyData = (key, comment_id) => {
    setTogler(false);
    setCommentId(comment_id);
    setPostcomment(comments[key]);
  };

  return (
    <>
      <div className="posts-container" style={{ margin: "0 auto" }}>
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
        <div className="body"><img src={post.photo} alt="" /></div>
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
      </div>
      <section className="comment-section">
        {comments.map((udata, k) => {
          return (
            <div className="comment-container" key={udata.comment_id}>
              <div className="comment">
                {/* <img src={udata.user_details.user_photo} width="50px" /> */}
                <div>
                  <div className="about-comment">
                    <h4>
                      {udata.user_details.first_name +
                        " " +
                        udata.user_details.last_name}
                    </h4>
                    <p>{udata.comment_message}</p>
                  </div>
                  <div className="comment-responce">
                    <span>Like</span>
                    &#x2223;
                    <span onClick={() => serReplyData(k, udata.comment_id)}>
                      Reply
                    </span>
                  </div>
                </div>
              </div>
              <div className="comment-reply">
                {/* {data.coment_reply !== undefined &&
                  commentsReplies.coment_reply.map((reply) => {
                    return (
                      <> */}
                <img src={profile} width="50px" />
                <div>
                  <div className="about-comment">
                    <h4>user name</h4>
                    <p>mesage</p>
                  </div>
                  <div className="comment-responce">
                    <span>Like</span>
                  </div>
                </div>
                {/* </>
                    );
                  })} */}
              </div>
            </div>
          );
        })}
        <div className="input-comment" hidden={!toggler}>
          <input
            type="text"
            placeholder="Write post comment"
            className="input"
            ref={comment}
          />
          <button type="submit" className="comment-post" onClick={sendComment}>
            Post
          </button>
        </div>
        <div className="input-comment" hidden={toggler}>
          <CommentReply
            postcomment={postcomment}
            setTogler={setTogler}
            commentId={commentId}
            getCommentReplies={getCommentReplies}
          />
        </div>
      </section>
    </>
  );
}
