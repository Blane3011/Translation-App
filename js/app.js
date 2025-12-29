if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/js/service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch(error => console.log("Service Worker Registration Failed", error));
}