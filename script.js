function customizeOrder(itemName) {
    document.getElementById('modalTitle').innerText = `Customize your ${itemName}`;
    document.getElementById('orderModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
}

function redirectToWelcome() {
    window.location.href = 'welcome.html';
}

function redirectToLogin() {
    window.location.href = 'login.html';
}

function submitLogin() {
    // Simulating successful login
    window.location.href = 'index.html';
}

function openProfileModal() {
    document.getElementById('profileModal').style.display = 'block';
    // Simulating loading user profile data
    document.getElementById('profileUsername').innerText = 'JohnDoe';
    document.getElementById('profileEmail').innerText = 'john.doe@example.com';
}

function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
}

function openAccountSettingsModal() {
    document.getElementById('accountSettingsModal').style.display = 'block';
}

function closeAccountSettingsModal() {
    document.getElementById('accountSettingsModal').style.display = 'none';
}

function submitAccountSettings() {
    // Simulate saving account settings
    alert('Account settings saved');
    document.getElementById('accountSettingsModal').style.display = 'none';
}
