const navButtons = document.querySelectorAll('.nav-btn');
const gifImage = document.querySelector('img');
const clickCounter = document.getElementById('click-counter');

const newGifUrl = "happy plant.gif";
const newGifUrl1 = "proud flower (1).gif";

// Check for stored timestamp
let storedTime = localStorage.getItem('clickTimestamp');
let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
let now = new Date().getTime();

// If 24 hours (86400000 ms) have passed, reset counter
if (!storedTime || now - storedTime > 86400000) {
  clickCount = 0;
  localStorage.setItem('clickCount', clickCount);
  localStorage.setItem('clickTimestamp', now);
}

// Toast reference
const toast = document.getElementById('toast');

function showToast() {
  toast.classList.remove('hidden');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 500); // hide it again after fade-out
  }, 3000);
}

// Reset logic
if (!storedTime || now - storedTime > 86400000) {
  clickCount = 0;
  localStorage.setItem('clickCount', clickCount);
  localStorage.setItem('clickTimestamp', now);
  showToast(); // show the reset notification
}


// Update counter and image when page loads
clickCounter.textContent = `Button clicks: ${clickCount}`;
if (clickCount >= 20) {
  gifImage.src = newGifUrl1;
} else if (clickCount >= 5) {
  gifImage.src = newGifUrl;
}

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    clickCount++;
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('clickTimestamp', new Date().getTime()); // Refresh timestamp

    clickCounter.textContent = `Button clicks: ${clickCount}`;

    if (clickCount === 5) {
      gifImage.src = newGifUrl;
    }
    if (clickCount === 20) {
      gifImage.src = newGifUrl1;
    }
  });
});
