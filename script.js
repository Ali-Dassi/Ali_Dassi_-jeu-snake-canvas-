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
function randomFood() {
    return {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}
function draw() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, 400, 400);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "lime" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;
    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;

    if (headX === food.x && headY === food.y) {
        score++;
        food = randomFood();
    } else {
        snake.pop();
    }

    let newHead = {x: headX, y: headY};

    if (
        headX < 0 || headX >= 400 ||
        headY < 0 || headY >= 400 ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        saveScore(score);
        alert("Game Over! Score: " + score);
    }

    snake.unshift(newHead);

    document.getElementById("score").innerText = "Score: " + score;
}
function collision(head, array) {
    return array.some(segment => segment.x === head.x && segment.y === head.y);
}
function saveScore(score) {
    let best = localStorage.getItem("bestScore") || 0;
    if (score > best) {
        localStorage.setItem("bestScore", score);
        alert("Nouveau record !");
    }
}