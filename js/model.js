export class GameModel {
    constructor() {
        this.grid = Array(9).fill('');
        this.currentPlayer = '';
        this.players = [];
        this.isGameActive = false;
    }

    initializeGame(p1, p2) {
        this.players = [p1, p2];
        this.currentPlayer = p1;
        this.isGameActive = true;
        this.grid.fill('');
        localStorage.setItem('player1', p1);
        localStorage.setItem('player2', p2);
    }

    makeMove(i) {
        if (this.grid[i] === '') {
            this.grid[i] = this.currentPlayer;
            return true;
        }
        return false;
    }

    checkWin() {
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
            comb.every((i) => this.grid[i] === this.currentPlayer)
        );
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0];
    }
}

export const gameState = new GameModel();
