import { Coordinate, Id } from "./main"

export function idToCoord(id: Id) {
  return id.split("-").map((el) => parseInt(el)) as Coordinate
}

export function coordToId([x, y]: Coordinate) {
  return `${x}-${y}` as Id
}
