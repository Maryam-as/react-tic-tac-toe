import { useState } from "react";
export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  // initialize state for the player's name and provide a function to update it
  const [playerName, setPlayerName] = useState(initialName);
  // track whether the player is in edit mode (true if editing, false otherwise)
  const [isEditing, setIsEditing] = useState(false);
  function handleEditClick() {
    // update the new state based on the previous state value
    setIsEditing((editing) => !editing);
    // if switching to "not editing" mode, update the player name using the onChangeName function
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }
  // update playerName state with the value from the input field
  function handleChange(event) {
    setPlayerName(event.target.value);
  }
  // output this span when NOT in Edit mode
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  // output this input when in Edit mode
  if (isEditing) {
    // automatically fill this input field with the current player's name
    editablePlayerName = (
      // two-way data binding for user input: updates playerName state on change
      <input type="text" value={playerName} onChange={handleChange} required />
    );
  }
  return (
    // dynamically assign the "active" class to the list item based on isActive prop
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      {/* display the button's caption dynamically, depending on its current state */}
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
