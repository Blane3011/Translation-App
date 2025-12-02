if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch(error => console.log("Service Worker Registration Failed", error));
}

const constraints = {
  audio: true,
  video: false,
};

document.getElementById("microphoneButton").addEventListener("click", () => {
    alert("Recording started. Please allow microphone access if prompted.");
    document.getElementById("microphoneButton").src = "Images/Icons/activeMicrophone.png";
});

navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    const audioTracks = stream.getAudioTracks();
    console.log("Got stream with constraints:", constraints);
    console.log(`Using audio device: ${audioTracks[0].label}`);
    stream.onremovetrack = () => {
      console.log("Stream ended");
    };
    audio.srcObject = stream;
  })
  .catch((error) => {

    if (error.name === "NotAllowedError") {
      console.error(
        "You need to grant this page permission to access your microphone.",
      );
    } else {
      console.error(`getUserMedia error: ${error.name}`, error);
    }
  });