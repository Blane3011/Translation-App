const constraints = {
  audio: true,
  video: false,
};

document.getElementById("microphoneButton").addEventListener("click", () => {
    navigator.permissions.query({ name: "microphone" }).then((result) => {
  if (result.state === "granted") {
        alert("Recording started. Please allow microphone access if prompted.");
    document.getElementById("microphoneButton").src = "Images/Icons/activeMicrophone.png";
  } else if (result.state === "prompt") {
        alert("Please allow microphone access.");
        getMicrophoneAccess();
  }
  // Don't do anything if the permission was denied.
});

});
function getMicrophoneAccess() {
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
};



