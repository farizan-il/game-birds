const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Gambar Burung
const birdImg = new Image();
// Menggunakan gambar lokal. Pastikan file bird.png berada di folder yang sama dengan script.js
birdImg.src = "https://w7.pngwing.com/pngs/534/225/png-transparent-flappy-bird-birds-jump-hd-bird-flight-game-bird-game-animals-smiley.png";

// Variabel Game
const bird = {
    x: 50,
    y: 150,
    width: 40,
    height: 30,
    gravity: 0.6,
    lift: -8,
    velocity: 0
};

let pipes = [];
let score = 0;

// Menambahkan pipa pertama
pipes.push({
    x: canvas.width,
    y: Math.floor(Math.random() * canvas.height / 2) + 100,
    width: 50,
    height: canvas.height
});

// Menggambar Burung
function drawBird() {
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}

// Menggambar Pipa
function drawPipes() {
    for (let i = 0; i < pipes.length; i++) {
        ctx.fillStyle = "#4CAF50";
        ctx.fillRect(pipes[i].x, 0, pipes[i].width, pipes[i].y - 100); // Pipa atas
        ctx.fillRect(pipes[i].x, pipes[i].y + 100, pipes[i].width, canvas.height); // Pipa bawah
    }
}

// Update Pipa
function updatePipes() {
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= 2;

        // Menambah pipa baru
        if (pipes[i].x === 200) {
            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * canvas.height / 2) + 100,
                width: 50,
                height: canvas.height
            });
        }

        // Menghapus pipa yang keluar dari layar
        if (pipes[i].x + pipes[i].width < 0) {
            pipes.shift();
            score++;
        }

        // Cek tabrakan
        if (bird.x < pipes[i].x + pipes[i].width &&
            bird.x + bird.width > pipes[i].x &&
            (bird.y < pipes[i].y - 100 || bird.y + bird.height > pipes[i].y + 100)) {
            alert("Game Over! Score: " + score);
            document.location.reload();
        }
    }
}

// Update Burung
function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        alert("Game Over! Score: " + score);
        document.location.reload();
    }
}

// Fungsi Utama Game
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas
    drawBird(); // Gambar burung
    drawPipes(); // Gambar pipa
    updateBird(); // Update posisi burung
    updatePipes(); // Update posisi pipa
    requestAnimationFrame(gameLoop); // Panggil fungsi gameLoop secara rekursif
}

// Memulai game setelah gambar burung termuat
birdImg.onload = function() {
    gameLoop();
};

// Menggerakkan burung ke atas saat menekan tombol space
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        bird.velocity = bird.lift;
    }
});
