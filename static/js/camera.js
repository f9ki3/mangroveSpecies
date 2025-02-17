const URL = "/static/mangrove_model/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  try {
    // Load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // Set this to true to flip the webcam horizontally
    webcam = new tmImage.Webcam(900, 500, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // Append the webcam canvas to the DOM
    const webcamCanvas = webcam.canvas;
    document.getElementById("webcam-container").appendChild(webcamCanvas);

    // Style the webcam container and canvas for rounded corners
    webcamCanvas.style.borderRadius = "15px";
    webcamCanvas.style.border = "10px solid blue"; // Adjust the value to your preference

    labelContainer = document.getElementById("label-container");

    // Create a container for class labels
    for (let i = 0; i < maxPredictions; i++) {
      labelContainer.appendChild(document.createElement("div"));
    }
  } catch (error) {
    console.error("Error loading the model or webcam:", error);
  }
}

async function loop() {
  webcam.update(); // Update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

// Run the webcam image through the image model
async function predict() {
  try {
    const prediction = await model.predict(webcam.canvas);

    // Update the label with predictions
    let highestPrediction = { className: "", probability: 0 };
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;

      // Check if this is the highest probability prediction
      if (prediction[i].probability > highestPrediction.probability) {
        highestPrediction = {
          className: prediction[i].className,
          probability: prediction[i].probability,
        };
      }
    }

    // Display the highest predicted class and its probability in the 'predicted' paragraph
    const predictedElement = document.getElementById("predicted");
    predictedElement.innerHTML = `${
      highestPrediction.className
    }: ${highestPrediction.probability.toFixed(2)}`;
  } catch (error) {
    console.error("Prediction error:", error);
  }
}

init();
