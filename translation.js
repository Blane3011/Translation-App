const constraints =
{
  audio: true,
  video: false,
};

getMicrophoneAccess();

var recording = false
var messages = [];
let audioChunks = [];

var microphoneButton = document.getElementById("microphoneButton");

microphoneButton.addEventListener("mousedown", startRecording);
microphoneButton.addEventListener("mouseup", stopRecording);
microphoneButton.addEventListener("touchstart", startRecording);

//Some browsers support with prefixed properties and some don't so added both to be safe.
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;



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

async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    chunks = [];

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.start();
    document.getElementById("microphoneIcon").src = "Images/Icons/activeMicrophone.png";

    console.log("Recording started");
}

function stopRecording() {
    if (!mediaRecorder) return;

    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
        const url = URL.createObjectURL(blob);

        audio = new Audio(url);
        audio.play();
        document.getElementById("microphoneIcon").src = "Images/Icons/microphone.png";

        console.log("Recording stopped");
    };

    mediaRecorder.stop();
}

function transcribeAudio(blob) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-UK";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.processLocally = true;

      recognition.available({ langs: ["en-UK"], processLocally: true }).then(
    (result) => {
      if (result === "unavailable") {
        diagnostic.textContent = `en-UK is not available to download at this time. Sorry!`;
      } else if (result === "available") {
        recognition.start();
        console.log("Ready to receive a color command.");
      } else {
        diagnostic.textContent = `en-UK language pack is downloading...`;
        SpeechRecognition.install({
          langs: ["en-UK"],
          processLocally: true,
        }).then((result) => {
          if (result) {
            diagnostic.textContent = `en-UK language pack downloaded. Start recognition again.`;
          } else {
            diagnostic.textContent = `en-UK language pack failed to download. Try again later.`;
          }
        });
      }
    },
  );

    recognition.start();
    console.log("Transcribing audio...");
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




