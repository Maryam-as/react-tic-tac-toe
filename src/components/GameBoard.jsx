import { useState } from "react";
// define the structure for a 3x3 grid game board
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function GameBoard({ onSelectSquare }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  function handleSelectSquare(rowIndex, colIndex) {
    // update the gameBoard state based on the previous state of that gameBoard
    setGameBoard((prevGameBoard) => {
      // the state that depends on objects or arrays - reference values - should be
      // updated in an immutable way: create a deep copy of the old state, then change the copy
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      updatedBoard[rowIndex][colIndex] = "X"; // mark the selected square as "X"
      return updatedBoard;
    });
    // call onSelectSquare function from inside of handleSelectSquare function because this function is triggered if a square was selected by clicking the button
    onSelectSquare();
  }
  return (
    // render the game board grid dynamically based on initialGameBoard data
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
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
