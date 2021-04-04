export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function fillThreeInARow(squares, player) {
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            squares[i] = player;
            if (calculateWinner(squares) === player) {
                squares[i] = null;
                return i;
            }
            squares[i] = null;
        }
    }
    return null;
}

function removeFilled(possibleMoves, squares) {
    let counter = 0;
    for (let i = 0; i < possibleMoves.length + counter; i++) {
        if (squares[possibleMoves[i - counter]]) {
            possibleMoves.splice(i - counter, 1);
            counter++;
        }
    }
}

function lastMove(history) {
    for (let i = 0; i < 9; i++) {
        if (history[history.length - 1].squares[i] !== history[history.length - 2].squares[i]) {
            return i;
        }
    }
}

function hardModeAlgorithm(squares, history) {
    if (!squares[4]) return [4];

    let possibleMoves;
    let properCell = Math.abs(lastMove(history) - 8);

    if (properCell === 2 || properCell === 6)
        possibleMoves = [properCell - 1, properCell + 1];
    else if (properCell === 3)
        possibleMoves = [0, 6];
    else if (properCell === 5)
        possibleMoves = [2, 8];
    else possibleMoves = [properCell];

    removeFilled(possibleMoves, squares);

    if (possibleMoves.length === 0 || properCell === 4) {
        possibleMoves = [0, 2, 6, 8];
        removeFilled(possibleMoves, squares);
    }
    return possibleMoves;
}

export function botMind(history, hardMode) {
    let squares = history[history.length - 1].squares.slice();
    let filledSquares = 0;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i]) filledSquares++;
    }
    let bot = (filledSquares % 2 === 0) ? 'X' : 'O';
    let user = (filledSquares % 2 === 0) ? 'O' : 'X';

    // First compulsive rule
    let compulsiveMove = fillThreeInARow(squares, bot);
    if (compulsiveMove) return compulsiveMove;

    // Second compulsive rule
    compulsiveMove = fillThreeInARow(squares, user);
    if (compulsiveMove) return compulsiveMove;

    let possibleMoves = hardMode ? hardModeAlgorithm(squares, history) : [];

    if (possibleMoves.length === 0) {
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) possibleMoves.push(i);
        }
    }
    return possibleMoves[Math.floor(Math.random() * (possibleMoves.length))];
}
