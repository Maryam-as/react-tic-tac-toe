// define the structure for a 3x3 grid game board
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function GameBoard({ onSelectSquare, turns }) {
  // derive the gameBoard from the turns prop which is the gameTurns state array managed in the App component
  let gameBoard = initialGameBoard;
  // overwrite the gameBoard with the data from turns array if there are any turns
  // if turns is an empty array, the loop simply won't execute
  for (const turn of turns) {
    const { square, player } = turn; // destructure turn to get square and player
    const { row, col } = square;
    gameBoard[row][col] = player; // mark the selected square with the player's symbol
  }
  return (
    // render the game board grid dynamically based on initialGameBoard data
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null} // disable the button if a symbol has already been placed
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
