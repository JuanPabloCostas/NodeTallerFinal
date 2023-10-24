// showMessage.js

export function showMessage(comment) {
    const Message = document.getElementById('message');
    Message.innerText = comment;
    Message.style.display = 'block';
    

    // Optional: Hide the message after a few seconds
    setTimeout(() => {
        Message.style.display = 'none';
    }, 3000);  // Hide after 3 seconds (adjust as needed)
}

