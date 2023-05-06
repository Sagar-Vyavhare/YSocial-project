import React from 'react' 
import feed from'../images/feedback.png'
import chat from "../images/chat.png";
import bookmark from "../images/bookmark.png";
import favorite from'../images/favorite.png'
import question from'../images/question-mark.png'
import suitcase from "../images/suitcase.png";
import event from "../images/event.png";
import "./SideBarComponent.css";
import { Link } from 'react-router-dom';
export default function SideBarComponent() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <img src={feed} alt="" />
        <h4>Feed</h4>
      </div>
      <div className="sidebar-content">
        <img src={chat} alt="" />
        <h4>Chat</h4>
      </div>
      <div className="sidebar-content">
        <img src={bookmark} alt="" />
        <h4>Bookmark</h4>
      </div>
      <div className="sidebar-content">
        <img src={favorite} alt="" />
        <h4>Favorite</h4>
      </div>
      <div className="sidebar-content">
        <img src={question} alt="" />
        <h4>Question</h4>
      </div>
      <div className="sidebar-content">
        <img src={suitcase} alt="" />
        <h4>
          <Link to="openings">Jobs</Link>
        </h4>
      </div>
      <div className="sidebar-content">
        <img src={event} alt="" />
        <h4>Events</h4>
      </div>
    </div>
  );
}
