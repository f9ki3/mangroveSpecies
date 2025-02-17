document.addEventListener("DOMContentLoaded", function () {
  const cameraContainer = document.getElementById("camera");
  const overlay = document.getElementById("overlay");

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const video = document.createElement("video");
    video.setAttribute("autoplay", true);
    video.setAttribute("playsinline", true);
    cameraContainer.appendChild(video);

    video.style.position = "absolute";
    video.style.top = "0";
    video.style.left = "0";
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "cover";

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((err) => {
        console.error("Camera access denied:", err);
        showNoCameraMessage();
      });

    function updateDateTime() {
      const now = new Date();
      const dateTimeString = now.toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      overlay.textContent = dateTimeString;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000); // Update every second
  } else {
    showNoCameraMessage();
  }

  function showNoCameraMessage() {
    cameraContainer.innerHTML = `
        <div class="no-camera">
          <div class="no-camera-icon">📷🚫</div>
          <p>No Camera Detected</p>
        </div>
      `;
  }
});
