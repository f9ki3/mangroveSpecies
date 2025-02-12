document
  .getElementById("file-input")
  .addEventListener("change", function (event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // Create a FileReader to read the file
      reader.onload = function (e) {
        // Display the image preview and hide the icon
        const previewContainer = document.getElementById("image-preview");
        const previewImg = document.getElementById("preview-img");
        const previewIcon = document.getElementById("preview-icon");
        const loadingSpinner = document.getElementById("loading-spinner");

        previewIcon.style.display = "none"; // Hide the icon
        previewImg.src = e.target.result; // Set the image source
        previewImg.style.display = "block"; // Show the image

        // Show loading spinner before prediction
        loadingSpinner.classList.remove("d-none");

        // Load image into model prediction
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
          predict(img);
        };
      };
      reader.readAsDataURL(file); // Convert the file to a Data URL
    }
  });

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
  // Get the highest probability result
  const bestPrediction = prediction.reduce((prev, current) =>
    prev.probability > current.probability ? prev : current
  );

  const labelContainer = document.getElementById("label-container");
  const statusLabel = document.getElementById("status-label");
  const loadingSpinner = document.getElementById("loading-spinner");
  const saveChangesBtn = document.querySelector(".modal-footer .btn-primary"); // Get "Save changes" button

  // Hide the loading spinner after prediction is complete
  loadingSpinner.classList.add("d-none");

  if (bestPrediction.probability < 0.97) {
    statusLabel.innerText = "Not Detected";
    statusLabel.style.backgroundColor = "rgb(239, 189, 189)";
    statusLabel.style.color = "red";
    statusLabel.style.border = "2px solid red";

    labelContainer.style.display = "none";
    saveChangesBtn.disabled = true; // Disable the "Save changes" button
  } else {
    statusLabel.innerText = "Detected";
    statusLabel.style.backgroundColor = "rgb(189, 239, 189)";
    statusLabel.style.color = "green";
    statusLabel.style.border = "2px solid green";

    labelContainer.innerHTML = `${bestPrediction.className}: ${(
      bestPrediction.probability * 100
    ).toFixed(2)}%`;
    labelContainer.style.display = "block";

    saveChangesBtn.disabled = false; // Enable the "Save changes" button
  }
}

init();
