import React, { Component } from "react";
import LoadModel from "../model/LoadModel.js";

class Detection extends Component {
  render() {
    let model;
    LoadModel().then(res => {
      model = res;
    });

    return <div className="detectionContainer" />;
  }
}
export default Detection;
