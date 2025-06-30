document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signInForm');
  const nameInput = document.getElementById('nameInput');
  const leavesContainer = document.getElementById('leaves');

  const renderLeaves = (names) => {
    leavesContainer.innerHTML = '';
    names.forEach(entry => {
      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      leaf.textContent = `${entry.name} ✅`;
      leavesContainer.appendChild(leaf);
    });
  };

  // Fetch existing sign-ins on page load
  fetch('/signin')
    .then(res => res.json())
    .then(data => renderLeaves(data));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) return;

    fetch('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(() => {
        // Refresh list after signing in
        return fetch('/signin');
      })
      .then(res => res.json())
      .then(data => {
        renderLeaves(data);
        nameInput.value = '';
      });
  });
});
