import React, { Component } from "react";
import LoadModel from "../model/LoadModel.js";
import Webcam from "../webcam/Webcam.js";
import "./Detection.css";

import Loading from "../loading/Loading.js";

class Detection extends Component {
  state = {
    model: {},
    modelLoaded: false,
    webcam: null
  };

  componentWillMount() {
    // Load model and save it in state
    LoadModel().then(res => {
      this.setState({ model: res, modelLoaded: true });
    });
  }

  componentDidMount() {
    let webcam;
    let canvas;

    const renderPredictions = predictions => {
      // Clear canvas before each redraw
      const ctx = canvas.getContext("2d");
      ctx.strokeStyle = "#5ff442";
      ctx.font = "14px Helvetica";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      predictions.forEach(prediction => {
        // Draw a box using the coordinates received from predictions
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        const width = prediction.bbox[2];
        const height = prediction.bbox[3];

        ctx.strokeRect(x, y, width, height);
        ctx.fillText(
          prediction.class,
          prediction.bbox[0],
          prediction.bbox[1] - prediction.bbox[1] * 0.05
        );
      });
    };

    const detectObject = () => {
      // Use the models detect function to detect objects
      // Call rendering function
      // Rerun
      this.state.model.detect(webcam).then(predictions => {
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
        }, 2000);
      }
    };

    initializeDetection();
  }

  render() {
    return (
      <div className="detectionContainer">
        {this.state.modelLoaded ? <Webcam /> : <Loading />}
      </div>
    );
  }
}
export default Detection;
