const offlineIndicator = document.getElementById("offline-indicator");

function updateConnectionStatus() {
    if (navigator.onLine) {
        offlineIndicator.classList.remove("show");
    } else {
        offlineIndicator.classList.add("show");
    }
}

window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);

updateConnectionStatus();