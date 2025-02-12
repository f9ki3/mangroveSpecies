function save_detected() {
  let labelText = $("#label-container").text().trim();
  let statusText = $("#status-label").text().trim();
  let fileInput = $("#file-input")[0].files[0];

  if (!fileInput) {
    alert("No image selected!");
    return;
  }

  let formData = new FormData();
  formData.append("predicted", labelText);
  formData.append("status", statusText);
  formData.append("image", fileInput);

  $.ajax({
    url: "/save_detected", // Change this to your server endpoint
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
      console.log(response);
      alert("Detection saved successfully!");
      window.location.reload();
    },
    error: function (xhr, status, error) {
      console.error(error);
      alert("Failed to save detection.");
    },
  });
}
