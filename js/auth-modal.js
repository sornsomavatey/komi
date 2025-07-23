document.addEventListener('DOMContentLoaded', () => {
  const BASE_URL = 'http://localhost:5000';  // Change this to EC2 IP when deploying

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

  // LOGIN
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      msg.textContent = '✅ Login successful!';
      msg.className = 'text-success';
      localStorage.setItem('komi-token', 'dummy-token'); // For now, since we're not using JWT yet
      localStorage.setItem('komi-username', data.user.name);
      setTimeout(() => location.reload(), 1000);
    } else {
      msg.textContent = data.message || 'Login failed.';
      msg.className = 'text-danger';
    }
  });

  // SIGNUP
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
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
