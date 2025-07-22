const navButtons = document.querySelectorAll('.nav-btn');
const gifImage = document.getElementById('gif-image');
const clickCounter = document.getElementById('click-counter');
const toast = document.getElementById('toast');

// 🎞 GIF stages
const newGifUrl = "happy plant.gif";           // Stage 1 at 5+
const newGifUrl1 = "proud flower (1).gif";     // Stage 2 at 20+
const newGifUrl2 = "buff tree.gif";            // Stage 3 at 50+

// 🕒 Time-based reset
let storedTime = parseInt(localStorage.getItem('clickTimestamp')) || 0;
let now = Date.now();
let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;

if (!storedTime || now - storedTime >= 86400000) {
  // Reset counter + timestamp
  clickCount = 0;
  storedTime = now;
  localStorage.setItem('clickCount', clickCount);
  localStorage.setItem('clickTimestamp', storedTime);
  showToast();
}

// 🖼 Update UI on load
clickCounter.textContent = `Button clicks: ${clickCount}`;
updateGif(clickCount);

// 🌱 Click logic
navButtons.forEach(button => {
  button.addEventListener('click', () => {
    clickCount++;
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('clickTimestamp', Date.now()); // Refresh timestamp
    clickCounter.textContent = `Button clicks: ${clickCount}`;
    updateGif(clickCount);
  });
});

// 🔁 GIF update helper
function updateGif(count) {
  if (count >= 50) {
    gifImage.src = newGifUrl2;
  } else if (count >= 20) {
    gifImage.src = newGifUrl1;
  } else if (count >= 5) {
    gifImage.src = newGifUrl;
  } else {
    gifImage.src = "crying plant.gif"; // default stage
  }
}

// 🍞 Toast animation
function showToast() {
  toast.classList.remove('hidden');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 500);
  }, 3000);
}
