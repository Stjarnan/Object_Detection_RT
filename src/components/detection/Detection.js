import React, { Component } from "react";
import LoadModel from "../model/LoadModel.js";
import Webcam from "../webcam/Webcam.js";

class Detection extends Component {
  state = {
    model: {},
    modelLoaded: false
  };

  componentWillMount() {
    LoadModel().then(res => {
      this.setState({ model: res, modelLoaded: true });
    });
  }

  render() {
    return (
      <div className="detectionContainer">
        <Webcam />
      </div>
    );
  }
}
export default Detection;
