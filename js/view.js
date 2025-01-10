import { gameState } from './model.js';

export class GameView {
    constructor() {
        this.gameBoard = document.getElementById('game-board');
        this.messageModal = document.getElementById('message-modal');
        this.messageElement = document.getElementById('message');
        this.errorElement = document.getElementById('error-message');
        this.loadingElement = document.getElementById('loading');
        this.restartBtn = document.getElementById('restart-btn');
        this.form = document.getElementById('player-form');
    }

    updateGrid(i, symbol) {
        const cell = this.gameBoard.querySelector(`[data-index="${i}"]`);
        cell.textContent = symbol;
    }

    displayMessage(message) {
        this.messageElement.textContent = message;
        this.messageModal.style.display = 'block';
        this.restartBtn.classList.remove('hidden');
    }

    displayError(message) {
        this.errorElement.textContent = message;
        this.errorElement.classList.remove('hidden');
    }

    showLoading() {
        this.loadingElement.classList.remove('hidden');
    }

    hideLoading() {
        this.loadingElement.classList.add('hidden');
    }

    disableForm() {
        this.form.querySelectorAll('input').forEach(input => input.disabled = true);
        this.form.querySelector('button').disabled = true;
    }

    enableForm() {
        this.form.querySelectorAll('input').forEach(input => input.disabled = false);
        this.form.querySelector('button').disabled = false;
    }

    closeModal() {
        this.messageModal.style.display = 'none';
    }

    restartGame() {
        this.messageModal.style.display = 'none';
        this.restartBtn.classList.add('hidden');
        document.querySelectorAll('.grid-cell').forEach(cell => cell.textContent = '');
    }
}

export const gameView = new GameView();

document.querySelector('.close-btn').addEventListener('click', () => gameView.closeModal());
window.addEventListener('click', (event) => {
    if (event.target == gameView.messageModal) {
        gameView.closeModal();
    }
});
document.getElementById('restart-btn').addEventListener('click', () => {
    const player1 = localStorage.getItem('player1') || document.getElementById('player1').value;
    const player2 = localStorage.getItem('player2') || document.getElementById('player2').value;
    gameState.initializeGame(player1, player2);
    gameView.restartGame();
});
