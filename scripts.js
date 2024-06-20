// scripts.js

let cart = []; // Global variable to store items in the cart

function addToCart(item) {
  cart.push(item);
  alert(item + ' added to cart!');
  
  // Update cart count in the header
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function login() {
  const form = document.getElementById('loginForm');
  const email = form.elements['email'].value;
  const password = form.elements['password'].value;

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  const user = users.find(u => u.email === email);

  if (user) {
    if (user.password === password) {
      alert(`Welcome back, ${user.fullName}! Redirecting to menu page.`);
      window.location.href = 'menu.html';
    } else {
      alert('Incorrect email or password. Please try again.');
    }
  } else {
    alert('Incorrect email or password. Please try again.');
  }
}

function createAccount() {
  const form = document.getElementById('createAccountForm');
  const fullName = form.elements['fullname'].value;
  const email = form.elements['email'].value;
  const password = form.elements['password'].value;

  if (!fullName || !email || !password) {
    alert('Please enter your full name, email, and password.');
    return;
  }

  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    alert('Account already exists. Please login.');
    window.location.href = 'login.html';
  } else {
    users.push({ fullName, email, password });
    alert('Account created successfully! Please login.');
    window.location.href = 'login.html';
  }
}

function proceedToPayment() {
  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }
  window.location.href = 'payment.html';
}

function processPayment() {
  const form = document.getElementById('paymentForm');
  const cardNumber = form.elements['cardNumber'].value;
  const cardHolder = form.elements['cardHolder'].value;
  const expiryDate = form.elements['expiryDate'].value;
  const cvv = form.elements['cvv'].value;

  // Basic validation to ensure all fields are filled
  if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
    alert('Please fill in all fields.');
    return;
  }

  // Simulate processing (replace with actual payment processing logic)
  alert('Payment processed successfully!');
  // Clear the cart after successful payment
  cart = [];
  // Redirect to a thank you page or homepage
  window.location.href = 'index.html';
}
