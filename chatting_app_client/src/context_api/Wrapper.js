import React, { useState } from "react";
import setGlobal from "./UserDataContext";
export default function Wrapper(props) {
  const [userData, setUserData] = useState([]);
  return (
    <>
      <setGlobal.Provider value={{ userData, setUserData }}>
        {props.children}
      </setGlobal.Provider>
    </>
  );
}
