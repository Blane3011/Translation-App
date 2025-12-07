const constraints =
{
  audio: true,
  video: false,
};

var recording = false
var messages = [];
let audioChunks = [];
//const mediaRecorder = new MediaRecorder(stream);

document.getElementById("microphoneButton").addEventListener("click", () => {
    navigator.permissions.query({ name: "microphone" }).then((result) =>
    {
      if (result.state === "granted") {
            alert("Recording started.");
            document.getElementById("microphoneIcon").src = "Images/Icons/activeMicrophone.png";
            startRecording();
            document.getElementById("microphoneButton").removeEventListener("click", () => {});

            document.getElementById("microphoneButton").addEventListener("click", () => {
                stopRecording();
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

function startRecording() {
    audioChunks = [];
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = e => {
                audioChunks.push(e.data);
            };

            mediaRecorder.start(); // begin recording
            console.log("Recording started");
        });
}

function CreateMessageCard(originalText, translatedText, source)
{
  console.log("Creating message card with source:" + source);
  var messageCard = document.createElement("div");

  switch(source)
  {
    case "user": 
          messageCard.innerHTML = `
          <div class="d-flex justify-content-start mb-3">
            <div class="card-body userMessage p-2 p-md-5">
              <p class="card-text">${originalText}</p>
              <p class="card-text fst-italic">${translatedText}</p>
            </div>
          </div>
  `;
    break;
    
    case "other":
        messageCard.innerHTML = `
        <div class="d-flex justify-content-end mb-3">
            <div class="card-body otherMessage p-2 p-md-5">
              <p class="card-text">${originalText}</p>
              <p class="card-text fst-italic">${translatedText}</p>
            </div>
        </div>
    `;
    break;  

    default:
      alert("Error: Unknown message source.");
      break;
  }
 
  document.getElementById("messageBox").appendChild(messageCard); 
}

function addMessage(originalText, translatedText, source)
{
    console.log("Creating message with source:" + source);
  messages.push({ original: originalText, translated: translatedText, source: source });
}

addMessage("Hello", "Hola", "user");  
addMessage("Goodbye", "Adiós", "user");
addMessage("Gracias", "Thank you", "other");
addMessage("Gracias", "Thank you", "other");
addMessage("Gracias", "Thank you", "other");
addMessage("Gracias", "Thank you", "other");

console.log("Messages array:", messages);
  for (let i = 0; i < messages.length; i++) {
    CreateMessageCard(messages[i].original, messages[i].translated, messages[i].source);
  }
  
if(messages.length == 0)
{
  document.getElementById("messageBox").innerHTML = "<h4 class='text-center'>No messages yet. Start recording to create a message!</h4>";
}




