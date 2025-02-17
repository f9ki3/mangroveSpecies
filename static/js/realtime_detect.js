const MODEL_URL = "/static/mangrove_model/model.json";

async function loadModel() {
  console.log("Loading model...");
  const model = await tf.loadLayersModel(MODEL_URL); // FIX: Use loadLayersModel for .json format
  console.log("Model loaded successfully!");
  return model;
}

async function setupCamera() {
  const video = document.createElement("video");
  video.setAttribute("autoplay", "");
  video.setAttribute("playsinline", "");
  video.style.position = "absolute";
  video.style.width = "100%";
  video.style.height = "100%";

  // Access the camera
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => resolve(video);
  });
}

function createCanvas(video) {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "10";
  return canvas;
}

async function startDetection() {
  const model = await loadModel();
  const video = await setupCamera();

  // Append video inside the camera container
  const cameraDiv = document.getElementById("camera");
  cameraDiv.style.position = "relative";
  cameraDiv.appendChild(video);
  video.play();

  // Create a canvas for bounding boxes
  const canvas = createCanvas(video);
  cameraDiv.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const classLabels = ["Mangrove A", "Mangrove B", "Mangrove C"]; // Change to actual class names

  async function detectFrame() {
    if (!video.videoWidth || !video.videoHeight) {
      requestAnimationFrame(detectFrame);
      return;
    }

    // Match the canvas size with the video frame
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Convert video frame to tensor
    const tfImg = tf.browser.fromPixels(video);
    const resized = tf.image.resizeBilinear(tfImg, [224, 224]); // Adjust to model's input size
    const normalized = resized.div(255.0);
    const expanded = normalized.expandDims(0);

    // Run inference
    const predictions = await model.predict(expanded).array();
    console.log("Raw Predictions:", predictions);

    const highestIndex = predictions[0].indexOf(Math.max(...predictions[0]));
    const predictedClass = classLabels[highestIndex] || "Unknown";
    const confidence = (predictions[0][highestIndex] * 100).toFixed(1);

    console.log(
      `Predicted Class: ${predictedClass}, Confidence: ${confidence}%`
    );

    // Clear previous bounding boxes
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the prediction on the canvas
    ctx.fillStyle = "red";
    ctx.font = "20px Arial";
    ctx.fillText(`Class: ${predictedClass}`, 20, 40);
    ctx.fillText(`Confidence: ${confidence}%`, 20, 70);

    // Cleanup tensors
    tfImg.dispose();
    resized.dispose();
    normalized.dispose();
    expanded.dispose();

    requestAnimationFrame(detectFrame);
  }

  detectFrame();
}

// Start the real-time detection when the page loads
window.onload = () => {
  startDetection();
};
