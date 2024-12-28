let isOpen = false;
let btn = document.querySelector(".switch");
let bulbTop = document.querySelector(".bulb-top");
let bulbBottom = document.querySelector(".bulb-bottom");

// Function to toggle flashlight
async function toggleFlashlight(state) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();

        if (capabilities.torch) {
            const constraints = { advanced: [{ torch: state }] };
            track.applyConstraints(constraints);
        } else {
            console.warn("Torch is not supported on this device.");
        }

        // Stop the track to avoid keeping the camera active
        if (!state) {
            track.stop();
        }
    } catch (error) {
        console.error("Error accessing the flashlight:", error);
    }
}

// Toggle bulb and flashlight
btn.addEventListener("click", function () {
    if (isOpen) {
        btn.classList.remove("on");
        bulbBottom.classList.remove("bulbOn");
        bulbTop.classList.remove("bulbOn");
        toggleFlashlight(false); // Turn off flashlight
    } else {
        btn.classList.add("on");
        bulbBottom.classList.add("bulbOn");
        bulbTop.classList.add("bulbOn");
        toggleFlashlight(true); // Turn on flashlight
    }
    isOpen = !isOpen;
});
