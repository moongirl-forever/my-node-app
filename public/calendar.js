const calendarDays = document.getElementById('calendar-days');
const eventForm = document.getElementById('event-form');
const eventList = document.getElementById('event-list');
const eventDate = document.getElementById('event-date');
const eventTitle = document.getElementById('event-title');

let events = JSON.parse(localStorage.getItem('keyClubEvents')) || [];

// Generate days of current month
function renderCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1).getDay(); // 0–6
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarDays.innerHTML = '';

  for (let i = 0; i < firstDay; i++) {
    calendarDays.innerHTML += '<div></div>';
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.textContent = d;
    calendarDays.appendChild(dayDiv);
  }
}

function renderEvents() {
  eventList.innerHTML = '';

  events.forEach((event, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${event.date} — ${event.title} <button class="delete-btn" data-index="${index}">❌</button>`;
    eventList.appendChild(li);
  });

 // Add delete logic to each button
const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const i = e.target.dataset.index;
    const confirmed = confirm("Are you sure you want to delete this event?");
    if (confirmed) {
      events.splice(i, 1);
      localStorage.setItem('keyClubEvents', JSON.stringify(events));
      renderEvents(); // Re-render after deletion
    }
  });
});
}


// Event form submission
eventForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newEvent = {
    date: eventDate.value,
    title: eventTitle.value.trim()
  };
  if (newEvent.date && newEvent.title) {
    events.push(newEvent);
    localStorage.setItem('keyClubEvents', JSON.stringify(events));
    renderEvents();
    eventForm.reset();
  }
});

// Initialize
renderCalendar();
renderEvents();
