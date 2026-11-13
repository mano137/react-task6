import React, { useState } from "react";
import "./App.css";

function App() {

  let [board, setBoard] = useState([
    "", "", "",
    "", "", "",
    "", "", ""
  ]);

  let [player, setPlayer] = useState("X");
  let [winner, setWinner] = useState("");

  let checkWinner = (newBoard) => {

    let winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
      let [a, b, c] = pattern;

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }

    return "";
  };

  let handleClick = (index) => {

    if (board[index] !== "" || winner !== "") {
      return;
    }

    let newBoard = [...board];

    newBoard[index] = player;

    setBoard(newBoard);

    let result = checkWinner(newBoard);

    if (result) {
      setWinner(result + " Wins!");
    } 
    else if (!newBoard.includes("")) {
      setWinner("Match Draw!");
    } 
    else {
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  let restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
    setWinner("");
  };

  return (
    <div className="container">

      <h1>XO Game</h1>

      <h3>
        {winner ? winner : "Player " + player + " Turn"}
      </h3>

      <div className="board">
        {board.map((value, index) => (
          <button
            className="cell"
            key={index}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <button className="restart" onClick={restartGame}>
        Restart Game
      </button>

    </div>
  );
}

export default App;