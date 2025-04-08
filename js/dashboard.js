// Placeholder for dashboard.js
const apiUrl = 'https://finance-backend-h3v6.onrender.com/api/transactions';
const userName = localStorage.getItem('userName');
const token = localStorage.getItem('token');

document.getElementById('username').innerText = userName;

const userId = JSON.parse(atob(token.split('.')[1])).userId;

// Add transaction
document.getElementById('transactionForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const transaction = {
    userId,
    type: document.getElementById('type').value,
    amount: parseFloat(document.getElementById('amount').value),
    category: document.getElementById('category').value,
    date: document.getElementById('date').value,
    description: document.getElementById('description').value,
  };

  await fetch(`${apiUrl}/add`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(transaction)
  });

  document.getElementById('transactionForm').reset();
  loadTransactions();
});

async function loadTransactions() {
  const res = await fetch(`${apiUrl}/${userId}`);
  const data = await res.json();

  let balance = 0;
  document.getElementById('transactionList').innerHTML = '';

  // Calculate balance
  data.forEach(tx => {
    balance += tx.type === 'income' ? tx.amount : -tx.amount;
  });

  document.getElementById('balance').innerText = balance;

  // Show only latest 5 transactions
  const recentTransactions = data.slice(-5).reverse();

  recentTransactions.forEach(tx => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${tx.category}</strong> - ₹${tx.amount} 
      <em>(${tx.type})</em> | ${new Date(tx.date).toLocaleDateString()}<br/>
      ${tx.description || ''}
    `;
    li.style.color = tx.type === 'income' ? 'green' : 'red';
    document.getElementById('transactionList').appendChild(li);
  });
}


function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

// Load transactions on page load
loadTransactions();