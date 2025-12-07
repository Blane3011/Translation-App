const constraints =
{
  audio: true,
  video: false,
};

var recording = false
var messages = [];
const mediaRecorder = new MediaRecorder(stream);
alert("Translation Screen Loaded");

if(messages.length == 0)
{
  alert("No messages yet. Start recording to create a message!");
  document.getElementById("messageBox").innerHTML = "<h4 class='text-center'>No messages yet. Start recording to create a message!</h4>";
}

document.getElementById("microphoneButton").addEventListener("click", () => {
    navigator.permissions.query({ name: "microphone" }).then((result) => {
  if (result.state === "granted") {
        alert("Recording started.");
        document.getElementById("microphoneIcon").src = "Images/Icons/activeMicrophone.png";
        startRecording();
        document.getElementById("microphoneButton").removeEventListener("click", () => {});

        document.getElementById("microphoneButton").addEventListener("click", () => {
            stopRecording();1
        });

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

    if (error.name === "NotAllowedError")
    {
      console.error("You need to grant this page permission to access your microphone.");
    } else 
        {
        console.error(`getUserMedia error: ${error.name}`, error);
        }
  });
};

mediaRecorder.onstop = (e) => {
  console.log("recorder stopped");

  const audio = document.createElement("audio");

  audio.setAttribute("controls", "");

  const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
  chunks = [];
  const audioURL = window.URL.createObjectURL(blob);
  audio.src = audioURL;

  deleteButton.onclick = (e) => {
    let evtTgt = e.target;
    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
  };
};

function startRecording()
{
    mediaRecorder.start();

    let chunks = [];
    mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
    };
}

function stopRecording()
{
    mediaRecorder.stop();

}

function setToRecord()
{
    document.getElementById("microphoneButton").addEventListener("click", () => {
    navigator.permissions.query({ name: "microphone" }).then((result) => {
        if (result.state === "granted") {
                alert("Recording started.");
                document.getElementById("microphoneIcon").src = "Images/Icons/activeMicrophone.png";
                startRecording();

                document.getElementById("microphoneButton").removeEventListener("click", () => {});
                document.getElementById("microphoneButton").addEventListener("click", () =>
                {
                    stopRecording();
                });
        } else if (result.state === "prompt")
            {
                alert("Please allow microphone access.");
                getMicrophoneAccess();
            }
    });
    });
}

function setToStop()
{

}

function CreateMessageCard(originalText, translatedText)
{
  var message = "THIS IS A PLACEHGOLDER MESSAGE";
  var messageCard = document.createElement("div");
  messageCard.innt = "messageCard";

}


 function createCard(title, text, imgUrl) {
    const col = document.createElement("div");
    col.className = "col-md-4";

    const card = `
        <div class="card mb-3">
            <img src="${imgUrl}" class="card-img-top" alt="${title}">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${text}</p>
                <a href="#" class="btn btn-primary">Learn more</a>
            </div>
        </div>
    `;

    col.innerHTML = card;
    document.getElementById("card-container").appendChild(col);
}

// Example usage
createCard("Dynamic Card", "This card was created with JS.", "https://picsum.photos/300");






