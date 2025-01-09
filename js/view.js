function updateGrid(i, symbol) {
    const cell = document.querySelector(`[data-index="${i}"]`);
    cell.textContent = symbol;
}

function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    const modal = document.getElementById('message-modal');
    modal.style.display = 'block';
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.classList.remove('hidden');
}

function displayError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

document.querySelector('.close-btn').addEventListener('click', function() {
    const modal = document.getElementById('message-modal');
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('message-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

document.getElementById('restart-btn').addEventListener('click', function() {
    const player1 = localStorage.getItem('player1') || document.getElementById('player1').value;
    const player2 = localStorage.getItem('player2') || document.getElementById('player2').value;
    initializeGame(player1, player2);
    const modal = document.getElementById('message-modal');
    modal.style.display = 'none';
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.classList.add('hidden');
    document.querySelectorAll('.grid-cell').forEach(cell => cell.textContent = '');
});
