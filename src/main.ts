import "./style.css"

const app = document.getElementById("app") as HTMLElement
const rows = 20
const columns = 20

function createBoard() {
  const board = document.createElement("div")
  board.classList.add("board")
  app.appendChild(board)

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      const square = document.createElement("div")
      square.id = `${x}-${y}`
      board.appendChild(square)
    }
  }
}

createBoard()
