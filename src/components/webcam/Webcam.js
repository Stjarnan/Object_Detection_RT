import React, { Component } from "react";

class Webcam extends Component {
  componentDidMount() {
    const video = document.getElementById("webcam");

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          width: 600,
          height: 600
        }
      })
      .then(stream => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
        };
      });
  }

  render() {
    return (
      <div className="webcamContainer">
        <canvas id="canvas" width="600px" height="600px" />
        <video id="webcam" />
      </div>
    );
  }
}

export default Webcam;
