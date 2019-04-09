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
          height: 500
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
      <canvas id="canvas">
        <video id="webcam" />
      </canvas>
    );
  }
}

export default Webcam;
