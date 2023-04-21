import React from "react";
import ReactDOM from "react-dom/client";
import Wrapper from "./context/Wrapper";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import CommonComponenet from "./routing/CommonComponenet";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Wrapper>
      <CommonComponenet />
    </Wrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
