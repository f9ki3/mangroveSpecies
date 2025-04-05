function save_detected() {
  let labelText = $("#detected").text().trim();
  let statusText = $("#status").text().trim();
  let fileInput = $("#imageInput")[0].files[0];

  console.log("Predicted (detected text):", labelText); // Debugging
  console.log("Status:", statusText);

  if (!fileInput) {
    alert("No image selected!");
    return;
  }

  // Check if the file size is greater than 1 MB
  if (fileInput.size > 1048576) {
    // alert("The image is too large, resizing to fit under 1MB.");
    resizeImage(fileInput, labelText, statusText);
  } else {
    // If the image size is already under 1MB, just upload it
    uploadImage(fileInput, labelText, statusText);
  }
}

// Function to resize the image to under 1 MB
function resizeImage(fileInput, labelText, statusText) {
  let reader = new FileReader();

  reader.onload = function (e) {
    let img = new Image();
    img.onload = function () {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      // Maintain the aspect ratio
      let maxWidth = 1024; // Max width for resizing
      let maxHeight = 1024; // Max height for resizing
      let width = img.width;
      let height = img.height;

      // Resize the image to fit the max dimensions
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Convert the canvas to a blob and compress it
      canvas.toBlob(
        function (blob) {
          let newFile = new File([blob], fileInput.name, {
            type: "image/jpeg",
          });

          // Check if the file size is under 1 MB, compress further if needed
          if (blob.size > 1048576) {
            alert("The image is still too large. Compressing more...");
            // If still too large, adjust quality or resize again (optional)
          } else {
            uploadImage(newFile, labelText, statusText);
          }
        },
        "image/jpeg",
        0.8
      ); // 0.8 is the quality factor, adjust as needed
    };
    img.src = e.target.result;
  };

  reader.readAsDataURL(fileInput);
}

// Function to upload the image
function uploadImage(file, labelText, statusText) {
  let formData = new FormData();
  formData.append("predicted", labelText);
  formData.append("status", statusText);
  formData.append("image", file);

  $.ajax({
    url: "/save_detected",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
      if (response.success) {
        alert("Detection saved successfully!");
        console.log("Saved Data:", response.data);
      } else {
        alert("Error: " + response.message);
      }
      window.location.reload();
    },
    error: function (xhr, status, error) {
      console.error("Error Details:", xhr.responseText);
      alert("Failed to save detection.");
    },
  });
}

$(document).ready(function () {
  $("#save-button").prop("disabled", true); // Initially disabled

  function checkStatus() {
    const status = $("#status").text().trim().toLowerCase();
    const hasImage = $("#imageInput")[0].files.length > 0;

    // Enable save button if an image is selected regardless of status
    if (hasImage) {
      $("#save-button").prop("disabled", false);
    } else {
      $("#save-button").prop("disabled", true);
    }
  }

  // Observe status changes or when result is filled
  const observer = new MutationObserver(checkStatus);
  observer.observe(document.getElementById("status"), { childList: true });

  // Check when image changes
  $("#imageInput").on("change", function () {
    checkStatus();
  });
});
