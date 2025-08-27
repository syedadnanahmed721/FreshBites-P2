// Elements
const progressBar = document.getElementById("progress-bar");
const steps = document.querySelectorAll(".step");
const statusMessage = document.getElementById("status-message");
const timerElement = document.getElementById("timer");
const deliveryBoy = document.getElementById("delivery-boy");

// Step messages
const messages = [
  "Your food order has been placed 🍴",
  "Your food is being prepared 👨‍🍳",
  "Your order is out for delivery 🚚",
  "Your order has been delivered ✅"
];

let currentStep = 0;

// Update progress
function updateProgress() {
  // Fill progress bar
  progressBar.style.width = `${(currentStep / (steps.length - 1)) * 100}%`;

  // Highlight steps
  steps.forEach((step, index) => {
    step.classList.remove("active");
    if (index <= currentStep) step.classList.add("active");
  });

  // Update status message
  statusMessage.textContent = messages[currentStep];

  // Move delivery boy
  let stepWidth = document.querySelector(".progress-container").offsetWidth / (steps.length - 1);
  deliveryBoy.style.left = `${currentStep * stepWidth - 20}px`;

  // Continue until last step
  if (currentStep < steps.length - 1) {
    currentStep++;
    setTimeout(updateProgress, 8000); // step every 8s
  }
}

// Start progress updates
setTimeout(updateProgress, 2000);

// Delivery Countdown Timer (30 mins)
let timeLeft = 30 * 60; // 30 minutes in seconds

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerElement.textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  if (timeLeft > 0) {
    timeLeft--;
    setTimeout(updateTimer, 1000);
  } else {
    timerElement.textContent = "Delivered 🎉";
  }
}

// Start countdown
updateTimer();