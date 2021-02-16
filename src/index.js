import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    let sign = null;
    if (props.value === 'X') sign =
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="4.94975" width="7" height="72" rx="3.5" transform="rotate(-45 0 4.94975)" fill="#CF0000"/>
            <rect x="50.9117" width="7" height="72" rx="3.5" transform="rotate(45 50.9117 0)" fill="#CF0000"/>
        </svg>
    if (props.value === 'O') sign =
        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M29 58C45.0163 58 58 45.0163 58 29C58 12.9837 45.0163 0 29 0C12.9837 0 0 12.9837 0 29C0 45.0163 12.9837 58 29 58ZM29 51C41.1503 51 51 41.1503 51 29C51 16.8497 41.1503 7 29 7C16.8497 7 7 16.8497 7 29C7 41.1503 16.8497 51 29 51Z"
                  fill="#00B533"/>
        </svg>

    return (
        <button
            className="square"
            onClick={props.onClick}
            key={props.keyName}
        >
            {sign}
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
            result.push(<div className="board-row"> {thisRow} </div>);
        }
        return result;
    }
}

class LeftBoard extends React.Component {
    render() {
        let button1, button2;
        if (this.props["firstIsO"]) {
            button1 = <button id='X' className='x-b' onClick={this.props.changeFirst}>
                <svg className='little-signs' width="28" height="28" viewBox="0 0 28 28"
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="2.47481" width="3.49991" height="35.9991" rx="1.74996"
                          transform="rotate(-45 0 2.47481)" fill="#CF0000"/>
                    <rect x="25.4552" width="3.49991" height="35.9991" rx="1.74996" transform="rotate(45 25.4552 0)"
                          fill="#CF0000"/>
                </svg>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Moves first
            </button>;
            button2 = <button id='O-now' className='x-b selected'>
                <svg className='little-signs' width="29" height="29" viewBox="0 0 29 29"
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M14.5 29C22.5081 29 29 22.5081 29 14.5C29 6.49187 22.5081 0 14.5 0C6.49187 0 0 6.49187 0 14.5C0 22.5081 6.49187 29 14.5 29ZM14.5 25.5C20.5751 25.5 25.5 20.5751 25.5 14.5C25.5 8.42487 20.5751 3.5 14.5 3.5C8.42487 3.5 3.5 8.42487 3.5 14.5C3.5 20.5751 8.42487 25.5 14.5 25.5Z"
                          fill="#00B533"/>
                </svg>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Moves second
            </button>;
        } else {
            button1 = <button id='X-now' className='x-b selected'>
                <svg className='little-signs' width="28" height="28" viewBox="0 0 28 28"
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="2.47481" width="3.49991" height="35.9991" rx="1.74996"
                          transform="rotate(-45 0 2.47481)" fill="#CF0000"/>
                    <rect x="25.4552" width="3.49991" height="35.9991" rx="1.74996" transform="rotate(45 25.4552 0)"
                          fill="#CF0000"/>
                </svg>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Moves first
            </button>;
            button2 = <button id='O' className='x-b' onClick={this.props.changeFirst}>
                <svg className='little-signs' width="29" height="29" viewBox="0 0 29 29"
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M14.5 29C22.5081 29 29 22.5081 29 14.5C29 6.49187 22.5081 0 14.5 0C6.49187 0 0 6.49187 0 14.5C0 22.5081 6.49187 29 14.5 29ZM14.5 25.5C20.5751 25.5 25.5 20.5751 25.5 14.5C25.5 8.42487 20.5751 3.5 14.5 3.5C8.42487 3.5 3.5 8.42487 3.5 14.5C3.5 20.5751 8.42487 25.5 14.5 25.5Z"
                          fill="#00B533"/>
                </svg>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Moves second
            </button>;
        }

        let easy, hard;
        if (this.props.isHard) {
            easy = <button className='mode' onClick={this.props.changeMode}>Easy</button>;
            hard = <button className='mode selected'>Hard</button>;
        }
        else {
            easy = <button className='mode selected'>Easy</button>;
            hard = <button className='mode' onClick={this.props.changeMode}>Hard</button>;
        }

        return (
            <div className="left">
                <h2 className='l1'>Play as:</h2>
                {button1}
                {button2}
                <h2 className='l2'>Game mode</h2>
                {easy}
                {hard}
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
            firstIsO: false,
            isHard: false,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || (squares[i])) {
            return false;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
        return true;
    }

    botMove() {
        this.handleClick(botMind(this.state.history, this.state.isHard));
    }

    userClick(i) {
        if (this.handleClick(i))
            setTimeout(() => this.botMove(), 200);
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
        if (!step) {
            this.setState({
                history: [{
                    squares: Array(9).fill(null),
                }],
            }, () => {
                if (this.state["firstIsO"]) this.botMove()
            });
        }
    }

    defineStatus(winner) {
        const X = <svg className='little-sign' width="28" height="28" viewBox="0 0 28 28" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
            <rect y="2.47481" width="3.49991" height="35.9991" rx="1.74996" transform="rotate(-45 0 2.47481)"
                  fill="#CF0000"/>
            <rect x="25.4552" width="3.49991" height="35.9991" rx="1.74996" transform="rotate(45 25.4552 0)"
                  fill="#CF0000"/>
        </svg>;
        const O = <svg className='little-sign' width="29" height="29" viewBox="0 0 29 29" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M14.5 29C22.5081 29 29 22.5081 29 14.5C29 6.49187 22.5081 0 14.5 0C6.49187 0 0 6.49187 0 14.5C0 22.5081 6.49187 29 14.5 29ZM14.5 25.5C20.5751 25.5 25.5 20.5751 25.5 14.5C25.5 8.42487 20.5751 3.5 14.5 3.5C8.42487 3.5 3.5 8.42487 3.5 14.5C3.5 20.5751 8.42487 25.5 14.5 25.5Z"
                  fill="#00B533"/>
        </svg>;
        return winner ?
            ((winner === 'X') === this.state["firstIsO"]) ?
                <p className='red'>You lose</p> :
                <p className='green'>You won</p> :
            this.state.stepNumber < 9 ?
                [
                    'Current player:',
                    <div className='little-sign'> {this.state.xIsNext ? X : O} </div>
                ] :
                <span className='blue'>Draw</span>;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.slice(1).map(
            (step, move) => {
                if ((move % 2 === 0) !== this.state['firstIsO']) {
                    let userMove;
                    if (this.state['firstIsO']) userMove = (move + 1) / 2;
                    else userMove = (move + 2) / 2;
                    const desc = 'Move #' + userMove;
                    if (this.state.stepNumber !== move + 1)
                        return (
                            <button key={move} className='move-button' onClick={() => this.jumpTo(move + 1)}>
                                {desc}
                            </button>
                        )
                    else
                        return (
                            <button key={move} className='move-button selected'>
                                {desc}
                            </button>
                        );
                }
            });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.userClick(i)}
                    />
                </div>
                <LeftBoard
                    changeFirst={() => {
                        this.setState({firstIsO: !this.state["firstIsO"]});
                        if (!this.state.stepNumber) this.jumpTo(0);
                    }}
                    changeMode={()=> {
                        this.setState({isHard: !this.state.isHard});
                        if (!this.state.stepNumber) this.jumpTo(0);
                    }}
                    firstIsO={this.state["firstIsO"]}
                    isHard={this.state.isHard}
                    newGame={() => {
                        this.jumpTo(0)
                    }}
                />
                <div className="right">
                    <h2>Go to the move:</h2>
                    {moves}
                </div>
                <div className="game-info">
                    {this.defineStatus(winner)}
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

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

function lastMove(history) {
    for (let i = 0; i < 9; i++) {
        if (history[history.length - 1].squares[i] !== history[history.length - 2].squares[i]) {
            return i;
        }
    }
}

function botMind(history, isHard) {
    let squares = history[history.length - 1].squares.slice();
    let count = 0;
    for (let i = 0; i < 9; i++) {
        if (squares[i]) count++;
    }
    let bot = (count % 2 === 0) ? 'X' : 'O';
    let user = (count % 2 === 0) ? 'O' : 'X';

    // First compulsive rule
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
            squares[i] = bot;
            if (calculateWinner(squares) === bot) {
                squares[i] = null;
                return i;
            }
            squares[i] = null;
        }
    }

    // Second compulsive rule
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
            squares[i] = user;
            if (calculateWinner(squares) === user) {
                squares[i] = null;
                return i;
            }
            squares[i] = null;
        }
    }

    let propers = [];
    if (isHard) {
        if (squares[4] == null) return 4;
        let proper = Math.abs(lastMove(history) - 8);
        if (proper === 4)
            propers = [0, 2, 6, 8];
        else if (proper === 3)
            propers = [0, 6];
        else if (proper === 5)
            propers = [2, 8];
        else if (proper % 2 !== 0)
            propers = [proper - 1, proper + 1];
        else propers = [proper];
        
        let counter = 0;
        for (let i = 0; i < propers.length + counter; i++) {
            if (squares[propers[i-counter]]) {
                propers.splice(i - counter, 1);
                counter++;
            }
        }

        if (propers.length === 0) {
            propers = [0, 2, 6, 8];
            counter = 0;
            for (let i = 0; i < propers.length + counter; i++) {
                if (squares[propers[i-counter]]) {
                    propers.splice(i - counter, 1);
                    counter++;
                }
            }
        }
    }

    if (propers.length === 0) {
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) propers.push(i);
        }
    }
    return propers[Math.floor(Math.random() * (propers.length))];
}
