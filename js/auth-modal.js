// js/auth-modal.js

document.addEventListener('DOMContentLoaded', () => {
  const BASE_URL = 'http://localhost:5000';  // your backend server URL with port

  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const msg = document.getElementById('auth-msg');


  document.getElementById('show-login').onclick = () => {
    signupForm.classList.add('d-none');
    loginForm.classList.remove('d-none');
    msg.textContent = '';
  };

  document.getElementById('show-signup').onclick = () => {
    loginForm.classList.add('d-none');
    signupForm.classList.remove('d-none');
    msg.textContent = '';
  };

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const res = await fetch(`${BASE_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });


    const data = await res.json();
    if (res.ok) {
      msg.textContent = '✅ Login successful!';
      msg.className = 'text-success';
      localStorage.setItem('komi-token', data.token);
      localStorage.setItem('komi-username', data.username);
      setTimeout(() => location.reload(), 1000);
    } else {
      msg.textContent = data.message || 'Login failed.';
      msg.className = 'text-danger';
    }
  });

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const res = await fetch(`${BASE_URL}/api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });



    const data = await res.json();
    if (res.ok) {
      msg.textContent = '✅ Signup successful!';
      msg.className = 'text-success';
      setTimeout(() => {
        document.getElementById('show-login').click();
      }, 1000);
    } else {
      msg.textContent = data.message || 'Signup failed.';
      msg.className = 'text-danger';
    }
  });
});

// Show username or login button
function updateAuthUI() {
  const token = localStorage.getItem('komi-token');
  const username = localStorage.getItem('komi-username');
  const section = document.getElementById('auth-section');

  if (token && username) {
    section.innerHTML = `
      <span class="nav-link">Hi, ${username}</span>
      <button class="btn btn-sm btn-outline-danger ms-2" id="logout-btn">Logout</button>
    `;
  } else {
    section.innerHTML = `
      <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#authModal">
        <i class="fas fa-user"></i>
      </a>
    `;
  }
}

document.addEventListener('DOMContentLoaded', updateAuthUI);

// Logout handler
document.addEventListener('click', (e) => {
  if (e.target.id === 'logout-btn') {
    localStorage.removeItem('komi-token');
    localStorage.removeItem('komi-username');
    location.reload();
  }
});

