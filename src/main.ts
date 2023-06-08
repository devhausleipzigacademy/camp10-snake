import "./style.css"
import { coordToId } from "./utils"

export type Coordinate = [number, number]
export type Id = `${number}-${number}`

const app = document.getElementById("app") as HTMLElement
const rows = 20
const columns = 20
const snake: Array<Coordinate> = [
  [10, 14],
  [10, 13],
  [10, 12],
]

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

  snake.forEach((coord) => {
    const id = coordToId(coord)
    const square = document.getElementById(id) as HTMLDivElement
    square.classList.toggle("snake-square")
  })
}

createBoard()
