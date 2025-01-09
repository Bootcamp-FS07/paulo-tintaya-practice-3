const gameState = {
    grid: Array(9).fill(''),
    currentPlayer: '',
    players: [],
    isGameActive: false,
};

function initializeGame(p1, p2) {
    gameState.players = [p1, p2];
    gameState.currentPlayer = p1;
    gameState.isGameActive = true;
    gameState.grid.fill('');
    document.querySelectorAll('.grid-cell').forEach(cell => cell.textContent = '');
    localStorage.setItem('player1', p1);
    localStorage.setItem('player2', p2);
}

function makeMove(i) {
    if (gameState.grid[i] === '') {
        gameState.grid[i] = gameState.currentPlayer;
        return true;
    }
    return false;
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombinations.some((comb) =>
        comb.every((i) => gameState.grid[i] === gameState.currentPlayer)
    );
}
