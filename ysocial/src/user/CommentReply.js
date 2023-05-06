import React, { useContext, useRef } from "react";
import "./CommentReply.css";
import axios from "axios";
import data from "../context/GlobalData";
export default function CommentReply({
  postcomment,
  setTogler,
  commentId,
  getCommentReplies,
}) {
  const comment = useRef();
  const GlobalData = useContext(data);
  const sendCommentReply = () => {
    let reply_mesage = comment.current.value;
    let obj = {
      reply_mesage,
      reply_date: new Date().toLocaleDateString(),
      user_details: { user_id: GlobalData.userData.user_id },
      post_comment: { comment_id: commentId },
    };
    axios
      .post("http://localhost:9090/api/comment-reply", obj)
      .then((resp) => getCommentReplies());
  };
  return (
    <>
      <div className="reply-container">
        {postcomment !== undefined && (
          <div className="comment">
            <img src={postcomment.user_details.user_photo} width="50px" />
            <div>
              <div className="about-comment">
                <h4>
                  {postcomment.user_details.first_name +
                    " " +
                    postcomment.user_details.last_name}
                </h4>
                <p>{postcomment.comment_message}</p>
              </div>
            </div>
          </div>
        )}
        <button onClick={() => setTogler(true)}> &#10008;</button>
      </div>
      <input type="text" placeholder="Reply" className="input" ref={comment} />
      <button type="submit" className="comment-post" onClick={sendCommentReply}>
        Post
      </button>
    </>
  );
}
