import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loadContainer">
      <div className="loader">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </div>
  );
}
