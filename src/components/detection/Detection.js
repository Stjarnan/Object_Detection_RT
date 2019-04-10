import React, { Component } from "react";
import LoadModel from "../model/LoadModel.js";
import Webcam from "../webcam/Webcam.js";
import "./Detection.css";

class Detection extends Component {
  state = {
    model: {},
    modelLoaded: false,
    webcam: null
  };

  componentWillMount() {
    LoadModel().then(res => {
      this.setState({ model: res, modelLoaded: true });
    });
  }

  componentDidMount() {
    let webcam;
    let canvas;
    const renderPredictions = predictions => {
      predictions.forEach(prediction => {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        const width = prediction.bbox[2];
        const height = prediction.bbox[3];

        ctx.strokeRect(x, y, width, height);
      });
    };

    const detectObject = () => {
      this.state.model.detect(webcam).then(predictions => {
        console.log(predictions);
        renderPredictions(predictions);
        requestAnimationFrame(detectObject);
      });
    };

    const initializeDetection = () => {
      if (
        this.state.modelLoaded === true &&
        webcam !== null &&
        webcam.videoWidth > 1
      ) {
        webcam.width = webcam.videoWidth;
        webcam.height = webcam.videoHeight;
        detectObject();
      } else {
        setTimeout(() => {
          webcam = document.getElementById("webcam");
          canvas = document.getElementById("canvas");
          initializeDetection();
        }, 5000);
      }
    };

    initializeDetection();
  }

  render() {
    return (
      <div className="detectionContainer">
        {this.state.modelLoaded ? <Webcam /> : <p>Loading..</p>}
      </div>
    );
  }
}
export default Detection;
