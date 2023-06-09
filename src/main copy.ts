import "./style.css";
import { coordToId, coordinatesEqual, directionalChange } from "./utils";

export type Coordinate = [number, number];
export type Id = `${number}-${number}`;
export type Direction = "left" | "right" | "up" | "down";

const app = document.getElementById("app") as HTMLElement;

const rows = 20;
const columns = 20;
const defaultSnake: Array<Coordinate> = [
	[12, 10],
	[13, 10],
	[14, 10],
];

let snake: Array<Coordinate> = defaultSnake;

let apple: Coordinate;

let currentDirection: Direction = "left";

function createBoard() {
	const board = document.createElement("div");
	board.classList.add("board");
	app.appendChild(board);

	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < columns; x++) {
			const square = document.createElement("div");
			square.id = `${x}-${y}`;
			board.appendChild(square);
		}
	}

	drawApple();
	drawSnake(board);

	return board;
}

const board = createBoard();

function drawSnake(board: HTMLElement) {
	Array.from(board.children).forEach((square) =>
		square.classList.remove("snake-square")
	);
	snake.forEach((coord) => {
		const id = coordToId(coord);
		const square = document.getElementById(id) as HTMLDivElement;
		square.classList.add("snake-square");
	});
}

function updateSnake() {
	snake.pop();
	const [xCurrentHead, yCurrentHead] = snake[0];
	const [dX, dY] = directionalChange[currentDirection];

	const newHead = [xCurrentHead + dX, yCurrentHead + dY] as Coordinate;
	snake.unshift(newHead);

	if (coordinatesEqual(newHead, apple)) {
		//update player score

		//update snake body

		//remove the previous apple
		const el = document.getElementById(coordToId(apple)) as HTMLDivElement;
		el.classList.remove("apple-square");
		drawApple();
	}

	drawSnake(board);
}

function drawApple() {
	let appleExistsOnSnake: boolean;

	do {
		apple = [
			Math.floor(Math.random() * rows),
			Math.floor(Math.random() * columns),
		];

		appleExistsOnSnake = snake.some((snakeCoord) =>
			coordinatesEqual(snakeCoord, apple)
		);
	} while (appleExistsOnSnake);

	const appleId = coordToId(apple);
	const appleSquare = document.getElementById(appleId) as HTMLDivElement;
	appleSquare.classList.add("apple-square");
}

document.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "ArrowLeft": {
			if (currentDirection === "right") return;
			currentDirection = "left";
			break;
		}
		case "ArrowRight": {
			if (currentDirection === "left") return;
			currentDirection = "right";
			break;
		}
		case "ArrowUp": {
			if (currentDirection === "down") return;
			currentDirection = "up";
			break;
		}
		case "ArrowDown": {
			if (currentDirection === "up") return;
			currentDirection = "down";
			break;
		}
		default: {
			return;
		}
	}
	updateSnake();
});
