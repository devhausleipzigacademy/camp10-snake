import "./style.css";
import {
	coordToId,
	coordinatesEqual,
	directionalChange,
	getNextPosition,
} from "./utils";

export type Coordinate = [number, number];
export type Id = `${number}-${number}`;
export type Direction = "left" | "right" | "up" | "down";

const app = document.getElementById("app") as HTMLElement;
const startBtn = document.getElementById("start") as HTMLButtonElement;

const rows = 20;
const columns = 20;
const defaultSnake: Array<Coordinate> = [
	[12, 10],
	[13, 10],
	[14, 10],
];

let score: number = 0;
let snake: Array<Coordinate> = JSON.parse(JSON.stringify(defaultSnake));
let gameLoopId: number | null = null;
let board: HTMLElement | null = createBoard();

let apple: Coordinate;

let currentDirection: Direction = "left";

function createBoard(): HTMLElement {
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

	return board;
}

function drawSnake(board: HTMLElement): void {
	Array.from(board.children).forEach((square) =>
		square.classList.remove("snake-square")
	);
	snake.forEach((coord) => {
		const id = coordToId(coord);
		const square = document.getElementById(id) as HTMLDivElement;
		square.classList.add("snake-square");
	});
}

drawSnake(board);

function updateSnake(board: HTMLElement): void {
	snake.pop();
	const [xCurrentHead, yCurrentHead] = snake[0];
	const [dX, dY] = directionalChange[currentDirection];

	const newHead = [xCurrentHead + dX, yCurrentHead + dY] as Coordinate;

	snake.unshift(newHead);

	//snake hit itself
	const snakeHitsItself = snake
		.slice(1)
		.some((segment) => coordinatesEqual(segment, newHead));

	// snake hits the wall
	const isOutsideLeftWall = newHead[0] < 0;
	const isOutsideRightWall = newHead[0] >= rows;
	const isOutsideTopWall = newHead[1] < 0;
	const isOutsideBottomWall = newHead[1] >= columns;

	if (
		isOutsideLeftWall ||
		isOutsideRightWall ||
		isOutsideTopWall ||
		isOutsideBottomWall ||
		snakeHitsItself
	) {
		resetGame();
	}

	if (coordinatesEqual(newHead, apple)) {
		//update player score
		score++;
		const scoreElement = document.getElementById("player-score") as HTMLElement;
		scoreElement.textContent = `Score: ${score}`;

		const lastSegment = snake[snake.length - 1];
		const newSegment = getNextPosition(lastSegment, currentDirection);
		snake = [...snake, newSegment];

		//remove the previous apple
		const el = document.getElementById(coordToId(apple)) as HTMLDivElement;
		el.classList.remove("apple-square");
		drawApple();
	}

	drawSnake(board);
}

function drawApple(): void {
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

function initControls(): void {
	document.addEventListener("keydown", (event) => {
		switch (event.key) {
			case "ArrowLeft":
				if (currentDirection === "right") return;
				currentDirection = "left";
				break;
			case "ArrowRight":
				if (currentDirection === "left") return;
				currentDirection = "right";
				break;
			case "ArrowUp":
				if (currentDirection === "down") return;
				currentDirection = "up";
				break;
			case "ArrowDown":
				if (currentDirection === "up") return;
				currentDirection = "down";
				break;
			default:
				return;
		}
	});
}

function init(): void {
	resetGame();
	initControls();
	startBtn.setAttribute("disabled", "true");

	if (!board) {
		board = createBoard();
		drawApple();
	}

	gameLoopId = setInterval(() => {
		updateSnake(board as HTMLElement);
	}, 200);
}

startBtn.addEventListener("click", init);

function resetGame(): void {
	if (gameLoopId !== null) {
		clearInterval(gameLoopId);
		gameLoopId = null;
	}

	score = 0;
	snake = JSON.parse(JSON.stringify(defaultSnake));
	currentDirection = "left";

	const scoreElement = document.getElementById("player-score") as HTMLElement;
	scoreElement.textContent = `Score: ${score}`;

	if (board) {
		app.removeChild(board);
		board = null;
	}

	startBtn.disabled = false;
}

resetGame();
