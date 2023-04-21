import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ComonComponent from './main/ComonComponent';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals';
import Wrapper from './context_api/Wrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Wrapper>
      <ComonComponent />
    </Wrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
