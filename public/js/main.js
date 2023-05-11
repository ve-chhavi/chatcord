const chatForm = document.getElementById('chat-form');

const socket = io();

// Message from server
socket.on('message', message => {
//   console.log(message);

  outputMessage(message);
});

// When message is submitted
chatForm.addEventListener('submit', (e) => {
    // To prevent being saved in a file
    e.preventDefault();

    // Getting message from form by id
    const msg = e.target.elements.msg.value;
    
    // Emitting a message to payload
    socket.emit('chatMessage', msg);
});

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
