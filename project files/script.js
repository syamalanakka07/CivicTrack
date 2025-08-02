const API_URL = "http://localhost:5000/api";

// Register User
document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  
  const data = await response.json();
  document.getElementById('userResult').innerText = "✅ " + data.message;
});

// Create Issue
document.getElementById('issueForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  const response = await fetch(`${API_URL}/issues/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  });
  
  const data = await response.json();
  document.getElementById('issueResult').innerText = "✅ " + data.message;
});

// Load Issues
document.getElementById('loadIssues').addEventListener('click', async () => {
  const response = await fetch(`${API_URL}/issues`);
  const issues = await response.json();
  
  const container = document.getElementById('issuesList');
  container.innerHTML = '';
  
  issues.forEach(issue => {
    const div = document.createElement('div');
    div.className = 'col-md-4';
    div.innerHTML = `
      <div class="card border-success">
        <div class="card-body">
          <h5 class="card-title">${issue.title}</h5>
          <p class="card-text">${issue.description}</p>
          <span class="badge bg-warning">${issue.status}</span>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
});
