import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.klikkausFunktio}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xOnSeuraavana: true,
        };
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                klikkausFunktio={() => this.handleClick(i)}
            />
        );
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        if (this.state.xOnSeuraavana) {
            squares[i] = 'X';
        } else {
            squares[i] = 'O';
        }
        this.setState({
            squares: squares,
            xOnSeuraavana: !this.state.xOnSeuraavana,
        });
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Voittaja: ' + winner;
        } else {
            status = 'Seuraava pelaaja: ' + (this.state.xOnSeuraavana ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], // Vaakasuora 1  i=0
        [3, 4, 5], // Vaakasuora 2  i=1
        [6, 7, 8], // Vaakasuora 3  i=2
        [0, 3, 6], // Pystysuora 1  i=3
        [1, 4, 7], // Pystysuora 2  i=4
        [2, 5, 8], // Pystysuora 3  i=5
        [0, 4, 8], // Diagonaali 1  i=6
        [2, 4, 6], // Diagonaali 2  i=7
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);