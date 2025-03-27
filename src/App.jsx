import { useState } from "react";

import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

// define the structure for a 3x3 grid game board
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function App() {
  // manage the array of turns taken during the game
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  // derive the gameBoard from the gameTurns state
  let gameBoard = initialGameBoard;
  // overwrite the gameBoard with the data from gameTurns array if there are any turns
  // if gameTurns is an empty array, the loop simply won't execute
  for (const turn of gameTurns) {
    const { square, player } = turn; // destructure turn to get square and player
    const { row, col } = square;
    gameBoard[row][col] = player; // mark the selected square with the player's symbol
  }

  // add win condition
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = "";
    const secondSquareSymbol = "";
    const thirdSqaureSymbol = "";
  }
  function handleSelectSquare(rowIndex, colIndex) {
    // update the gameTurns based on the previous state of the gameTurns
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      // create a deep copy of the old state to update the gameTurns state array in an immutable way
      // insert the new turn in front of the old turns, so the 1st item in the updated array is always the latest turn
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {/* pass handleSelectSquare as a prop to GameBoard because that’s where the square selection occurs */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
