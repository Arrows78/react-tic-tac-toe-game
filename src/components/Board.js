import Square from './Square';
import calculateWinner from '../utils/calculateWinner';

function Board({ xIsNext, squares, onPlay, winningLine }) {
  const boardSize = 3;

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        highlight={winningLine?.includes(i)}
      />
    );
  };

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < boardSize; row++) {
      const boardRow = [];
      for (let col = 0; col < boardSize; col++) {
        const index = row * boardSize + col;
        boardRow.push(renderSquare(index));
      }
      board.push(
        <div key={row} className="board-row">
          {boardRow}
        </div>
      );
    }

    return board;
  };

  const result = calculateWinner(squares);
  const winner = result?.winner;

  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? 'Draw !'
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <>
      <div className="status">{status}</div>
      {renderBoard()}
    </>
  );
}

export default Board;
