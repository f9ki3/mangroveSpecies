$(document).ready(function () {
  $("#imageInput").on("change", function () {
    let file = this.files[0];

    if (!file) {
      alert("Please select an image file");
      return;
    }

    // Preview the image
    previewImage(file);

    // Check file size and handle accordingly
    if (file.size <= 5 * 1024 * 1024) {
      uploadImage(file);
    } else {
      resizeImage(file, function (compressedFile) {
        uploadImage(compressedFile);
      });
    }
  });

  function previewImage(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      $("#imagePreview").attr("src", e.target.result).removeClass("d-none");
    };
    reader.readAsDataURL(file);
    $("#show").hide();
    $("#result-div").show();
  }

  function resizeImage(file, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;

      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;
        const maxSize = 1024; // Resize dimension

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to JPEG
        canvas.toBlob(
          function (blob) {
            if (blob.size > 5 * 1024 * 1024) {
              alert("Image is too large, try selecting a smaller one.");
            } else {
              const newFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              callback(newFile);
            }
          },
          "image/jpeg",
          0.8
        );
      };
    };
    reader.readAsDataURL(file);
  }

  function uploadImage(file) {
    let formData = new FormData();
    formData.append("image", file);

    // Show loading indicators before sending
    $("#detected").text("Loading...");
    $("#status").text("Loading...");
    $("#confidence").text("Loading...");
    $("#remarks").text("Loading...");
    $("#btn-learn").html(""); // clear the button area
    $("#loading").removeClass("d-none"); // optional loading spinner elsewhere

    $.ajax({
      url: "/infer",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $("#loading").addClass("d-none"); // optional spinner hide

        if (response.predictions && response.predictions.length > 0) {
          const className = response.predictions[0].class;
          const confidence = (response.predictions[0].confidence * 100).toFixed(
            2
          );

          $("#detected").text(className);
          $("#status").text("Detected");
          $("#confidence").text(confidence + "%");

          const remark =
            confidence >= 80
              ? "Predicted Species (high confidence)"
              : "Prediction not accurate (low confidence)";
          $("#remarks").text(remark);

          const speciesName = className.toLowerCase().replace(/\s+/g, "-");
          const learnLink = `<a href="view_species?name=${speciesName}" class="btn border w-100 text-primary border-primary">Learn Species</a>`;
          $("#btn-learn").html(learnLink);
        } else {
          $("#detected").text("No Detected");
          $("#status").text("No Detected");
          $("#confidence").text("N/A");
          $("#remarks").text("");
          $("#btn-learn").html("");
        }
      },
      error: function (xhr) {
        $("#loading").addClass("d-none");
        $("#detected").text("Error");
        $("#status").text("Error");
        $("#confidence").text("N/A");
        $("#remarks").text("Something went wrong.");
        $("#btn-learn").html("");
      },
    });
  }
});
