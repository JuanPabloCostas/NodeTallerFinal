// validate.js

const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');
const usuario = localStorage.getItem('usuario');

// Check if both userId and token are present
if (!userId || !token) {
    // Redirect to the login page if either is missing
    window.location.href = 'login.html';
}

// Validate the token on the server-side (optional)
// You can make a request to your server to validate the token

// Example using fetch:
fetch('http://localhost:3003/api/auth/validateToken', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
    },
})
.then(response => {
    if (!response.ok) {
        // If the server denies the token, redirect to login
        throw new Error('Invalid token');
    }
})
.catch(error => {
    console.error('Error validating token:', error);
    window.location.href = 'login.html';
});

// Display user ID on the page
document.getElementById('usuario').innerText = usuario;