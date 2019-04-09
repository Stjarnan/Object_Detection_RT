import * as cocoSsd from "@tensorflow-models/coco-ssd";

const LoadModel = () => {
  async function loadmodel() {
    const model = await cocoSsd.load();
    return model;
  }

  return loadmodel();
};

export default LoadModel;
