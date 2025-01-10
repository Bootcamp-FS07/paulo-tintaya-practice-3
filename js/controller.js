import { gameState } from './model.js';
import { gameView } from './view.js';

document.getElementById('player-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;

    if (player1 === player2) {
        gameView.displayError('Player names cannot be the same');
        return;
    }

    gameView.showLoading();
    gameView.disableForm();

    setTimeout(() => {
        try {
            gameState.initializeGame(player1, player2);
            gameView.hideLoading();
            gameView.gameBoard.classList.remove('hidden');
        } catch (error) {
            gameView.displayError('An error occurred while initializing the game.');
            console.error(error);
        }
    }, 200);
});

document.getElementById('game-board').addEventListener('click', function(event) {
    if (!gameState.isGameActive) return;

    const cell = event.target;
    if (cell.classList.contains('grid-cell')) {
        const flatIndex = parseInt(cell.dataset.index, 10);

        if (gameState.makeMove(flatIndex)) {
            gameView.updateGrid(flatIndex, gameState.currentPlayer === gameState.players[0] ? 'X' : 'O');
            if (gameState.checkWin()) {
                gameView.displayMessage(`${gameState.currentPlayer} wins ;3`);
                gameState.isGameActive = false;
            } else if (gameState.grid.every(cell => cell)) {
                gameView.displayMessage("It's a tie :|");
                gameState.isGameActive = false;
            } else {
                gameState.switchPlayer();
            }
        }
    }
});
