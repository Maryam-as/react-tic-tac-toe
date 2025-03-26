export default function Log({ turns }) {
  return (
    <ol id="log">
      {/* dynamically render list items based on the gameTurns state array managed in the App component */}
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
