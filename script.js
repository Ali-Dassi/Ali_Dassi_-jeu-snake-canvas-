const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake;
let direction;
let food;
let score;
let game;

function start() {
    snake = [{x: 200, y: 200}];
    direction = "RIGHT";
    score = 0;
    food = randomFood();

    clearInterval(game);
    game = setInterval(draw, 100);
}

