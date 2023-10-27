// logout.js

document.getElementById('logoutButton').addEventListener('click', logout);

function logout() {
    // Clear user data from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    
    // Redirect the user to the login page
    window.location.href = "login.html";
}
