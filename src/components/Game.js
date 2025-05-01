import { useState } from 'react';
import Board from './Board';
import calculateWinner from '../utils/calculateWinner';

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const winnerResult = calculateWinner(currentSquares);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function restartGame() {
    const confirmed = window.confirm('Are you sure you want to start a new game?');
    if (confirmed) {
      setHistory([Array(9).fill(null)]);
      setCurrentMove(0);
    }
  }

  const moves = history.map((squares, move) => {
    if (move === currentMove) {
      return (
        <li key={move}>
          <span>You are at move #{move}</span>
        </li>
      );
    }

    let description;
    if (move === 0) {
      description = 'Go to game start';
    } else {
      const prev = history[move - 1];
      const currentIndex = squares.findIndex((val, i) => val !== prev[i]);
      const row = Math.floor(currentIndex / 3) + 1;
      const col = (currentIndex % 3) + 1;
      description = `Go to move #${move} (${row}, ${col})`;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const orderedMoves = isAscending ? moves : [...moves].reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          winningLine={winnerResult?.line}
        />
      </div>

      <div className="game-info">
        <button onClick={restartGame}>Restart game</button>
        <button onClick={() => setIsAscending(!isAscending)}>
          Sort {isAscending ? 'Descending' : 'Ascending'}
        </button>
        <ol>{orderedMoves}</ol>
      </div>
    </div>
  );
}

export default Game;
