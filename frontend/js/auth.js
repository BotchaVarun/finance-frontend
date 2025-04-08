// Placeholder for auth.js
const baseUrl = 'http://localhost:5000/api/auth';

if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
  
      const res = await fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, password })
      });
  
      const data = await res.json();
      document.getElementById('signupMsg').innerText = data.message || data.error;
      if (data.message) setTimeout(() => window.location.href = 'login.html', 1000);
    });
  }
  
  if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
  
      const res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });
  
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.name);
        window.location.href = 'dashboard.html';
      } else {
        document.getElementById('loginMsg').innerText = data.error;
      }
    });
  }