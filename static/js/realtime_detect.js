const URL = "/static/mangrove_model/";
let model, maxPredictions;

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
}

async function predict(imageElement) {
  const prediction = await model.predict(imageElement);
  const bestPrediction = prediction.reduce((prev, current) =>
    prev.probability > current.probability ? prev : current
  );

  // Log only the species name or species detected
  if (bestPrediction.probability >= 0.97) {
    const detectedSpecies = bestPrediction.className;
    console.log(`Detected Species: ${detectedSpecies}`);
  } else {
    console.log("Not Detected");
  }
}

init();
