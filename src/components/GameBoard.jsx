// define the structure for a 3x3 grid game board
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function GameBoard({ onSelectSquare }) {
  return (
    // render the game board grid dynamically based on initialGameBoard data
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={onSelectSquare}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
