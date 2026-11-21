const offlineIndicator = document.getElementById("offline-indicator");

async function updateConnectionStatus() {
    if (!offlineIndicator) return;

    try {
        const response = await fetch("./index.html?check=" + Date.now(), {
            method: "HEAD",
            cache: "no-store"
        });

        if (response.ok) {
            offlineIndicator.classList.remove("show");
        } else {
            offlineIndicator.classList.add("show");
        }
    } catch {
        offlineIndicator.classList.add("show");
    }
}

window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);

updateConnectionStatus();
setInterval(updateConnectionStatus, 5000);
