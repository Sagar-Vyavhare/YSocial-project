import React, { useContext, useRef, useState } from "react";
import "./NewPostComponent.css";
import profile from "../images/profile.png";
import star from "../images/star.png";
import tag from "../images/tag.png";
import image from "../images/image.png";
import placeholder from "../images/placeholder.png";
import data from "../context/GlobalData";
import axios from "axios";
export default function PostComponent() {
  // get data from global variables
  const usedata = useContext(data);

  const [titleHidden, setTitleHidden] = useState(true);
  const [descHidden, setDescHidden] = useState(true);
  const [selectImage, setSelectImage] = useState("");

  const title = useRef();
  const desc = useRef();
  const img = useRef();

  // to post a post
  const createPost = () => {
    let post_date = new Date().toLocaleDateString();
    let post_title = title.current.value;
    let post_description = desc.current.value;
    let photo = img.current.files[0];
    console.log(photo);
    let obj = {
      post_date,
      post_title,
      post_description,
      user_details: { user_id: usedata.userData.user_id },
    };
    let obj_as_string = JSON.stringify(obj);
    let data = new FormData();
    data.append('img', photo);
    data.append("string_obj", obj_as_string);
    if (post_title !== "" && post_description !== "" && photo !== "") {
      axios.post("http://localhost:9090/api/post", data
      ).then((resp) => {
        // console.log(resp.data);
        clearInput();
      });
    } else {
      if (post_title === "") {
        setTitleHidden(false);
      }
      if (post_description === "") {
        setDescHidden(false);
      }
      if (photo === "") {
        setSelectImage("select-img");
      }
    }
  };

  const clearInput = () => {
    title.current.value = "";
    img.current.value = "";
    desc.current.value = "";
  };

  return (
    <div className="post-container">
      <div className="user">
        <img
          src={
            usedata.userData.user_photo === null
              ? profile
              : usedata.userData.user_photo
          }
          alt="user "
        />
        <h4>
          {usedata.userData.first_name + " " + usedata.userData.last_name}
        </h4>
      </div>
      <div className="about-post">
        <div>
          <input
            type="text"
            placeholder="Write a title for a post..."
            ref={title}
            onClick={() => setTitleHidden(true)}
          />
          <span hidden={titleHidden}>Please write title</span>
        </div>

        <div>
          <textarea
            placeholder="What is in your mind..."
            ref={desc}
            onClick={() => setDescHidden(true)}
            rows="3"
          />
          <span hidden={descHidden}>Please write discription</span>
        </div>
      </div>
      <div className="post-content">
        <input type="file" id="file" ref={img} />
        <label htmlFor="file">
          <img
            src={image}
            alt=""
            className={selectImage}
            onClick={() => setSelectImage("")}
          />
        </label>
        <div>
          <img src={tag} alt="tag" />
          <h5>Tags</h5>
        </div>
        <div>
          <img src={placeholder} alt="tag" />
          <h5>location</h5>
        </div>

        <div>
          <img src={star} alt="rection emoji" />
          <h5>Reaction</h5>
        </div>

        <input type="button" value="Post" onClick={createPost} />
      </div>
    </div>
  );
}
