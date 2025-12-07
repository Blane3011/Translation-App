const constraints =
{
  audio: true,
  video: false,
};


var recording = false
var messages = [];
let audioChunks = [];

var microphoneButton = document.getElementById("microphoneButton");

microphoneButton.addEventListener("mousedown", startRecording);
microphoneButton.addEventListener("touchend", stopRecording);
microphoneButton.addEventListener("mouseup", stopRecording);
microphoneButton.addEventListener("touchstart", startRecording);

//Some browsers support with prefixed properties and some don't so added both to be safe.
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "en-GB";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.processLocally = true;

async function startRecording(event) {
  event.preventDefault();
  recognition.start();
  console.log("Transcribing audio...");
    
  document.getElementById("microphoneIcon").src = "Images/Icons/activeMicrophone.png";
}

function stopRecording()
{
  console.log("Stopping transcription.");
  document.getElementById("microphoneIcon").src = "Images/Icons/microphone.png";
  recognition.stop();
}

function transcribeAudio()
 {


  
    
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

recognition.onresult = function(event){
  alert("Processing local speech recognition for en-GB");
  console.log("Speech recognition result received.");
  
  console.log(event.results);
};
