document.getElementById('player-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;

    if (player1 === player2) {
        displayError('Player names cannot be the same');
        return;
    }

    showLoading();
    disableForm();

    setTimeout(() => {
        initializeGame(player1, player2);
        hideLoading();
        const gameBoard = document.getElementById('game-board');
        gameBoard.classList.remove('hidden');
    }, 200);
});

document.getElementById('game-board').addEventListener('click', function(event) {
    if (!gameState.isGameActive) return;

    const cell = event.target;
    if (cell.classList.contains('grid-cell')) {
        const flatIndex = parseInt(cell.dataset.index, 10);

        if (makeMove(flatIndex)) {
            updateGrid(flatIndex, gameState.currentPlayer === gameState.players[0] ? 'X' : 'O');
            if (checkWin()) {
                displayMessage(`${gameState.currentPlayer} wins ;3`);
                gameState.isGameActive = false;
            } else if (gameState.grid.every(cell => cell)) {
                displayMessage("It's a tie :|");
                gameState.isGameActive = false;
            } else {
                gameState.currentPlayer = gameState.currentPlayer === gameState.players[0] ? gameState.players[1] : gameState.players[0];
            }
        }
    }
});
