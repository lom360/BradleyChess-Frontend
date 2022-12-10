import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import NextMove from "./boards/NextMove";
import Visualization from "./components/Visualization";
import About from "./components/About";
import Streamers from "./chessapi/Streamers";


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
    <div>
      {/* <h1>Bradley Chess</h1> */}
      {/* <NextMove  /> */}
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<NextMove />} />
            <Route path="visualization" element={<Visualization/>} />
            <Route path="streams" element={<Streamers  />} />
            <Route path="about" element={<About />} />

            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);