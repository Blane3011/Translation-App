API_Key = "1_YbsRg5HZBg2yXDF5Y7C0PCaey";
API_URL = "https://smartcat.ai/api/integration/v1/translate/text"
API_User = "de98bb98-4f83-44e7-9b40-3366d61f8a82"

ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY;
ONESIGNAL_APP_ID = process.env.APP_ID;

console.log("API Key:", API_Key);
console.log("API User:", API_User);

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
    
  document.getElementById("microphoneIcon").src = "Images/Icons/activeMicrophone.png";
}

function stopRecording()
{
  console.log("Stopping transcription.");
  document.getElementById("microphoneIcon").src = "Images/Icons/microphone.png";
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
    headers: {Authorization: , 'Content-Type': 'application/json'},
    body: JSON.stringify({
      app_id: process.env.App_ID,
      contents: {en: 'Default message.'},
      include_aliases: {external_id: ['<string>']},
      target_channel: 'push',
      include_subscription_ids: ['<string>'],
      included_segments: ['<string>'],
      excluded_segments: ['<string>'],
      filters: [{field: 'tag', relation: '=', key: '<string>', value: '<string>'}],
      headings: {en: '<string>'},
      subtitle: {en: '<string>'},
      name: '<string>',
      template_id: '<string>',
      custom_data: {},
      ios_attachments: {id: '<string>'},
      big_picture: '<string>',
      huawei_big_picture: '<string>',
      adm_big_picture: '<string>',
      chrome_web_image: '<string>',
      small_icon: '<string>',
      huawei_small_icon: '<string>',
      adm_small_icon: '<string>',
      large_icon: '<string>',
      huawei_large_icon: '<string>',
      adm_large_icon: '<string>',
      chrome_web_icon: '<string>',
      firefox_icon: '<string>',
      chrome_web_badge: '<string>',
      android_channel_id: '<string>',
      existing_android_channel_id: '<string>',
      huawei_channel_id: '<string>',
      huawei_existing_channel_id: '<string>',
      huawei_category: 'MARKETING',
      huawei_msg_type: 'message',
      huawei_bi_tag: '<string>',
      priority: 10,
      ios_interruption_level: 'active',
      ios_sound: '<string>',
      ios_badgeType: 'None',
      ios_badgeCount: 123,
      android_accent_color: '<string>',
      huawei_accent_color: '<string>',
      url: '<string>',
      app_url: '<string>',
      web_url: '<string>',
      target_content_identifier: '<string>',
      buttons: [{id: '<string>', text: '<string>', icon: '<string>'}],
      web_buttons: [{id: '<string>', text: '<string>', url: '<string>'}],
      thread_id: '<string>',
      ios_relevance_score: 123,
      android_group: '<string>',
      adm_group: '<string>',
      ttl: 259200,
      collapse_id: '<string>',
      web_push_topic: '<string>',
      data: {},
      content_available: true,
      ios_category: '<string>',
      apns_push_type_override: '<string>',
      isIos: true,
      isAndroid: true,
      isHuawei: true,
      isAnyWeb: true,
      isChromeWeb: true,
      isFirefox: true,
      isSafari: true,
      isWP_WNS: true,
      isAdm: true,
      send_after: '<string>',
      delayed_option: '<string>',
      delivery_time_of_day: '<string>',
      throttle_rate_per_minute: 123,
      enable_frequency_cap: true,
      idempotency_key: '<string>'
    })
};

fetch('https://api.onesignal.com/notifications?c=push', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));


 }   // OneSignal code to send a notification