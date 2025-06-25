const form = document.getElementById('signInForm');
const nameInput = document.getElementById('nameInput');
const leaves = document.getElementById('leaves');

// Load saved entries
const today = new Date().toDateString();
let signups = JSON.parse(localStorage.getItem('signups_' + today)) || [];

function renderLeaves() {
  leaves.innerHTML = '';
  signups.forEach(signup => {
    const div = document.createElement('div');
    div.className = 'leaf';
    div.textContent = `${signup.name} @ ${signup.time}`;
    leaves.appendChild(div);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  if (name) {
    const time = new Date().toLocaleTimeString();
    signups.push({ name, time });
    localStorage.setItem('signups_' + today, JSON.stringify(signups));
    nameInput.value = '';
    renderLeaves();
  }
});

renderLeaves();
