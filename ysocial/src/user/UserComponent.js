
import "./UserComponent.css";
import { Outlet } from "react-router-dom";
import SideBarComponent from "./SideBarComponent";
export default function UserComponent() {

  return (
    <>
      <div className="user-container">
        <aside>
          <SideBarComponent />
        </aside>
        <section className="leftside">
          <Outlet/>
        </section>
      </div>
    </>
  );
}
