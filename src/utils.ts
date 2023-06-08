import { Coordinate, Direction, Id } from "./main"

export function idToCoord(id: Id) {
  return id.split("-").map((el) => parseInt(el)) as Coordinate
}

export function coordToId([x, y]: Coordinate) {
  return `${x}-${y}` as Id
}

export const directionalChange: Record<Direction, Coordinate> = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, -1],
  down: [0, 1],
}
