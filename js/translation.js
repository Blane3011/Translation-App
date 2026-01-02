
API_Key = "1_YbsRg5HZBg2yXDF5Y7C0PCaey";
API_URL = "https://smartcat.ai/api/integration/v1/translate/text"
API_User = "de98bb98-4f83-44e7-9b40-3366d61f8a82"

ONESIGNAL_API_KEY = "Key".concat(" ", process.env.ONESIGNAL_API_KEY);
ONESIGNAL_APP_ID = process.env.APP_ID;

console.log("API Key:", API_Key);
console.log("API User:", API_User);

alert("Translation script loaded.");

var recording = false
var messages = [];
let audioChunks = [];

var microphoneButton = document.getElementById("microphoneButton");

//Some browsers support with prefixed properties and some don't so added both to be safe.
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();

if(!SpeechRecognition)
{
  alert("Sorry, your browser does not support the Web Speech API. Please try using Google Chrome or Microsoft Edge.");
}

recognition.continuous = false;
recognition.lang = "en-GB";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
//recognition.processLocally = true;

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

sendErrorNotification();

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

async function translateText(text, targetLanguage = "es")
 {
   const body = {
    texts: text,
    targetLanguages: targetLanguage,
    sourceLanguage: "en"
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa(API_User + ":" + API_Key)
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error("Smartcat API error: " + response.status);
  }

  const data = await response.json();
  return data.translation || data.translatedText || data;
 }

 async function sendErrorNotification(){
  const options = {
    method: 'POST',
    headers: {Authorization: ONESIGNAL_API_KEY, 'Content-Type': 'application/json'},
    body: JSON.stringify({
      app_id: ONESIGNAL_APP_ID,
      contents: {en: 'This feature is not yet implemented.'},
      target_channel: 'push',
      template_id: '83e7abb0-1572-4a9d-a5eb-f0c970ea29a7'
    })
};

fetch('https://api.onesignal.com/notifications?c=push', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));

  console.log("Notification sent.");
 }   // OneSignal code to send a notification