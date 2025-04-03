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

  let formData = new FormData();
  formData.append("predicted", labelText);
  formData.append("status", statusText);
  formData.append("image", fileInput);

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
    if ($("#status").text().trim().toLowerCase() === "detected") {
      $("#save-button").prop("disabled", false);
    } else {
      $("#save-button").prop("disabled", true);
    }
  }

  // Monitor #status changes
  const observer = new MutationObserver(checkStatus);
  observer.observe(document.getElementById("status"), { childList: true });

  // Ensure check runs when an image is uploaded
  $("#imageInput").on("change", function () {
    checkStatus();
  });
});
