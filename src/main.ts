import "./style.css"
import { coordToId, directionalChange } from "./utils"

export type Coordinate = [number, number]
export type Id = `${number}-${number}`
export type Direction = "left" | "right" | "up" | "down"

const app = document.getElementById("app") as HTMLElement
const rows = 20
const columns = 20
const snake: Array<Coordinate> = [
  [12, 10],
  [13, 10],
  [14, 10],
]

let currentDirection: Direction = "left"

function createBoard() {
  const board = document.createElement("div")
  board.classList.add("board")
  app.appendChild(board)

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const square = document.createElement("div")
      square.id = `${x}-${y}`
      board.appendChild(square)
    }
  }

  drawSnake(board)

  return board
}

const board = createBoard()

function drawSnake(board: HTMLElement) {
  ;[...board.children].forEach((square) =>
    square.classList.remove("snake-square")
  )
  snake.forEach((coord) => {
    const id = coordToId(coord)
    const square = document.getElementById(id) as HTMLDivElement
    square.classList.add("snake-square")
  })
}

function updateSnake(direction: Direction) {
  snake.pop()
  const [xCurrentHead, yCurrentHead] = snake[0]
  const [dX, dY] = directionalChange[direction]

  const newHead = [xCurrentHead + dX, yCurrentHead + dY] as Coordinate
  snake.unshift(newHead)

  drawSnake(board)
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft": {
      if (currentDirection === "right") return
      currentDirection = "left"
      updateSnake("left")
      break
    }
    case "ArrowRight": {
      if (currentDirection === "left") return
      currentDirection = "right"
      updateSnake("right")
      break
    }
    case "ArrowUp": {
      if (currentDirection === "down") return
      currentDirection = "up"
      updateSnake("up")
      break
    }
    case "ArrowDown": {
      if (currentDirection === "up") return
      currentDirection = "down"
      updateSnake("down")
      break
    }
    default: {
      event.preventDefault()
    }
  }
})
