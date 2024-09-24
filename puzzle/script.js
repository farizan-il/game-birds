const canvas = document.getElementById("puzzleCanvas");
const ctx = canvas.getContext("2d");

const puzzleSize = 8;
const tileSize = canvas.width / puzzleSize;
const image = new Image();
image.src = 'puzzle-imag.jpg';

let tiles = [];
let emptyTile = { x: puzzleSize - 1, y: puzzleSize - 1 };

// Mengacak array menggunakan algoritma Fisher-Yates
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initTiles() {
    tiles = [];
    for (let y = 0; y < puzzleSize; y++) {
        for (let x = 0; x < puzzleSize; x++) {
            tiles.push({ x: x, y: y });
        }
    }
    tiles.pop();
    shuffle(tiles);
    tiles.push({ x: puzzleSize - 1, y: puzzleSize - 1 });
}

function drawPuzzle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        if (tile.x !== emptyTile.x || tile.y !== emptyTile.y) {
            const sourceX = tile.x * tileSize;
            const sourceY = tile.y * tileSize;
            const destX = (i % puzzleSize) * tileSize;
            const destY = Math.floor(i / puzzleSize) * tileSize;
            ctx.drawImage(image, sourceX, sourceY, tileSize, tileSize, destX, destY, tileSize, tileSize);
        }
    }
}

function isSolved() {
    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        if (tile.x !== i % puzzleSize || tile.y !== Math.floor(i / puzzleSize)) {
            return false;
        }
    }
    return true;
}

// Menukar posisi tile dengan tile kosong
function swapTiles(tileIndex) {
    const tile = tiles[tileIndex];
    const emptyIndex = tiles.findIndex(t => t.x === emptyTile.x && t.y === emptyTile.y);
    [tiles[emptyIndex], tiles[tileIndex]] = [tile, emptyTile];
    emptyTile = { ...tile };
}

// Menggerakkan tile
function moveTile(x, y) {
    const tileIndex = tiles.findIndex(tile => tile.x === x && tile.y === y);
    if (tileIndex > -1 && (Math.abs(emptyTile.x - x) + Math.abs(emptyTile.y - y) === 1)) {
        swapTiles(tileIndex);
        drawPuzzle();
        if (isSolved()) {
            alert("Puzzle Solved!");
        }
    }
}

// Event listener untuk klik pada canvas
canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / tileSize);
    const y = Math.floor((e.clientY - rect.top) / tileSize);
    moveTile(x, y);
});

// Mengacak puzzle saat tombol di-klik
document.getElementById("shuffleButton").addEventListener("click", () => {
    initTiles();
    drawPuzzle();
});

// Menggambar puzzle setelah gambar dimuat
image.onload = function() {
    initTiles();
    drawPuzzle();
};
