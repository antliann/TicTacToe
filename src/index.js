import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
            key={props.keyName}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (<Square
            keyName={'sq' + i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />);
    }

    render() {
        let result = [];
        for (let row = 0; row < 3; row++) {
            let thisRow = [];
            for (let col = 0; col < 3; col++) {
                thisRow.push(this.renderSquare(row * 3 + col));
            }
            result.push(<div className="board-row"> {thisRow} </div>)
        }
        return result;
    }
}

class LeftBoard extends React.Component {
    render() {
        return (
            <div className="left">
                <button className='new-game' onClick={this.props.newGame}>
                    <svg className='refresh' width="26" height="26" viewBox="0 0 26 26" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M24.4055 11.9641C23.8316 11.9641 23.3695 12.4262 23.3695 13C23.3695 18.718 18.718 23.3695 13 23.3695C7.28203 23.3695 2.63047 18.718 2.63047 13C2.63047 7.28203 7.28203 2.63047 13 2.63047C16.123 2.63047 19.0176 4.00664 20.9777 6.37305H17.3977C16.8238 6.37305 16.3617 6.83516 16.3617 7.40898C16.3617 7.98281 16.8238 8.44492 17.3977 8.44492H23.2172C23.791 8.44492 24.2531 7.98281 24.2531 7.40898V1.59453C24.2531 1.0207 23.791 0.558594 23.2172 0.558594C22.6434 0.558594 22.1812 1.0207 22.1812 1.59453V4.59063C19.8402 2.03633 16.5445 0.558594 13 0.558594C6.13945 0.558594 0.558594 6.13945 0.558594 13C0.558594 19.8605 6.13945 25.4414 13 25.4414C19.8605 25.4414 25.4414 19.8605 25.4414 13C25.4414 12.4262 24.9793 11.9641 24.4055 11.9641Z"
                            fill="white"/>
                    </svg>
                    New game
                </button>
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i])
            return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
        if (!step) this.setState({
            history: [{
                squares: Array(9).fill(null),
            }],
        });

    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.slice(1).map(
            (step, move) => {
                const desc = 'Move #' + ++move;
                if (this.state.stepNumber !== move)
                    return (
                        <button key={move} className='move-button' onClick={() => this.jumpTo(move)}>
                            {desc}
                        </button>
                    )
                else
                    return (
                        <button key={move} className='move-button selected'>
                            {desc}
                        </button>
                    );
            });

        let status;
        status = winner ?
            'The winner is ' + winner :
            this.state.stepNumber < 10 ?
                'Current player: ' + (this.state.xIsNext ? 'X' : 'O') :
                'Draw';

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <LeftBoard
                    newGame={() => this.jumpTo(0)}
                />
                <div className="right">
                    <h2>Go to the move:</h2>
                    {moves}
                </div>
                <div className="game-info">
                    {status}
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
)
;

function calculateWinner(squares) {
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