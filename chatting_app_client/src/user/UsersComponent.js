
import NavBarComponent from "../main/NavBarComponent";

import PostComponent from "./PostComponent";
import "./UsersComponent.css";

export default function UsersComponent() {
  

  return (
    <div style={{ backgroundColor: "#adb5bd" }} className="main-container">
      <NavBarComponent />
      <PostComponent />
    </div>
  );
}
