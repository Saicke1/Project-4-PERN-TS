import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./components/context/AuthContext";

/* const root = ReactDOM.createRoot(document.getElementById("root")); */
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <App />
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);