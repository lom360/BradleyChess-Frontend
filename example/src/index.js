import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import NextMove from "./boards/NextMove";


import "./index.css";

function App() {

  // useEffect(() => {
  //   function handleResize() {
  //     const display = document.getElementsByClassName("container")[0];
  //     setChessboardSize(display.offsetWidth - 20);
  //   }

  //   window.addEventListener("resize", handleResize);
  //   handleResize();
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // function getSelectedBoard() {

  // }

  return (
    <div className="container">
      <h1>Bradley Chess</h1>
      <NextMove  />

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);