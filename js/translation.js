
alert("Translation script loaded.");

var recording = false
var messages = [];
let audioChunks = [];

var microphoneButton = document.getElementById("microphoneButton");
//Created null variable as is assigned later if browser supports SpeechRecognition.
var recognition = null;

//Some browsers support with prefixed properties and some don't so added both to be safe.
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

if(!SpeechRecognition)
{
  alert("Sorry, your browser does not support the Web Speech API. Please try using Google Chrome or Microsoft Edge.");
}
else
{
  recognition = new SpeechRecognition();
  console.log("Recognition object initialized.");
}

if(!recognition)
{
  alert("Speech recognition could not be initialized.");
}
else
{
  recognition.continuous = false;
  recognition.lang = "en-GB";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  //recognition.processLocally = true;
}


async function startRecording(event) {
  event.preventDefault();
  recognition.start();
  console.log("Transcribing audio...");
    
  document.getElementById("microphoneIcon").src = "/Images/Icons/activeMicrophone.png";
}

function stopRecording()
{
  console.log("Stopping transcription.");
  document.getElementById("microphoneIcon").src = "/Images/Icons/microphone.png";
  recognition.stop();
}

 recognition.onstart = () => console.log("recognition started");
  recognition.onend = () => console.log("recognition ended");
  recognition.onerror = (e) => console.error("recognition error", e);
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("Transcript:", transcript);
    // e.g. CreateMessageCard(transcript, "...", "user");
  };

  document.getElementById("microphoneButton").addEventListener("click", () => {
    try {
      recognition.start(); // will trigger permission prompt if needed
    } catch (e) {
      console.warn("Could not start recognition:", e);
    }
  });

  document.getElementById("languageButton").addEventListener("click", () => {
    try {
     sendErrorNotification();
    } catch (e) {
      console.warn("Could not send error:", e);
    }
  });


async function CreateMessageCard(originalText, source)
{
  console.log("Creating message card with source:" + source);

  const translatedText = await translateText(originalText, "es");
  console.log("Translated " , originalText, "into ", " Translated text:", translatedText);
  console.log("Message source:", source);
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

function addMessage(originalText, source)
{
  messages.push({ original: originalText, source: source });
}

addMessage("Hello", "user");  
addMessage("Goodbye", "user");
addMessage("Gracias", "other");
addMessage("Gracias", "other");
addMessage("Gracias",  "other");
addMessage("Gracias", "other");

async function translateText(text) {
  const res = await fetch(
    "https://translation-app-7o5f.onrender.com/api/translate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: "es",
        format: "text"
      })
    }
  );

  return await res.json();
}

sendErrorNotification();

//Clears all of the current messages in the message box to prevent duplicates when reloading.
while(document.getElementById("messageBox").firstChild)
{
  document.getElementById("messageBox").removeChild(document.getElementById("messageBox").lastChild);
}

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
  console.log("Transcription:"  + event.results[0][0].transcript);
  alert("Translated to Spanish: " + translateText(event.results[0][0].transcript, "es"));
};

async function sendErrorNotification(){
  const response = await fetch("https://translation-app-7o5f.onrender.com/api/send-notification", {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });

  const data = await response.json();
  console.log(data);
};

