import { useState } from "react";

import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

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
  // initialize state to store player names, with "Player 1" as X and "Player 2" as O
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
  // manage the array of turns taken during the game
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  // derive the gameBoard from the gameTurns state
  // avoid overriding the initialGameBoard array in memory by creating a deep copy
  let gameBoard = [...initialGameBoard.map((nestedArray) => [...nestedArray])];
  // overwrite the gameBoard with the data from gameTurns array if there are any turns
  // if gameTurns is an empty array, the loop simply won't execute
  for (const turn of gameTurns) {
    const { square, player } = turn; // destructure turn to get square and player
    const { row, col } = square;
    gameBoard[row][col] = player; // mark the selected square with the player's symbol
  }
  let winner;
  // iterate over all winning combinations to check if there's a winner
  for (const combination of WINNING_COMBINATIONS) {
    // get the symbols from the gameBoard for each square in the current winning combination
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSqaureSymbol =
      gameBoard[combination[2].row][combination[2].column];
    // check if the first square is not empty and all three symbols are the same
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSqaureSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }
  // check if the game is a draw (9 turns played and no winner)
  const hasDraw = gameTurns.length === 9 && !winner;

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
  // define a function to reset the game state by clearing the game turns
  function handleRestart() {
    setGameTurns([]);
  }
  // function to handle changes in player names
  function handlePlayerNameChange(symbol, newName) {
    // update the players state based on the previous state value
    setPlayers((prevPlayers) => {
      return {
        // spread the previous players state to keep other player data intact
        ...prevPlayers,
        // update the player name for the given symbol (X or O)
        [symbol]: newName,
      };
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
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {/* conditionally render a game over message if there is a winner or a draw */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        {/* pass handleSelectSquare as a prop to GameBoard because that’s where the square selection occurs */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
