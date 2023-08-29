import React, { useState } from 'react'
// import './App.css'

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [gameOver, setGameOver] = useState(false)

  const handleClick = (index) => {
    if (board[index] || gameOver) {
      return
    }

    const newBoard = [...board]
    newBoard[index] = xIsNext ? 'X' : 'O'
    setBoard(newBoard)
    setXIsNext(!xIsNext)
    setGameOver(
      calculateWinner(newBoard) || newBoard.every((square) => square !== null)
    )
  }

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    )
  }

  const winner = calculateWinner(board)
  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else if (gameOver) {
    status = "It's a draw!"
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  const handlePlayAgain = () => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
    setGameOver(false)
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        <div>{status}</div>
        {winner || gameOver ? (
          <button onClick={handlePlayAgain}>Play Again</button>
        ) : null}
      </div>
    </div>
  )
}

// Function to determine the winner of the game
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default Game
