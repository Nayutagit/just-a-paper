const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const uiCount = document.getElementById('count');
const slots = document.querySelectorAll('.slot');
const messageArea = document.getElementById('message-area');
const messageText = document.getElementById('message-text');
const resetBtn = document.getElementById('reset-btn');
const speedSlider = document.getElementById('speed-slider');

// Game State
let speedMultiplier = parseInt(speedSlider.value, 10);
let monsters = [];
let particles = [];
let caughtTypes = new Set();
const monsterTypes = ['chibikaiju', 'teoku', 'wanwan'];
const totalTypes = 3;
let isGameActive = true;

// Speed Control Listener
speedSlider.addEventListener('input', (e) => {
    speedMultiplier = parseInt(e.target.value, 10);
});

// Assets
const images = {};
const assetPaths = {
    'chibikaiju': 'assets/monster_chibikaiju.png',
    'teoku': 'assets/monster_teoku.png',
    'wanwan': 'assets/monster_wanwan.png',
    'ball': 'assets/capture_ball.png'
};

let imagesLoaded = 0;
const totalImages = Object.keys(assetPaths).length;

function loadImages() {
    for (const [key, path] of Object.entries(assetPaths)) {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            imagesLoaded++;
        };
        img.onerror = () => {
            console.warn(`Failed to load ${path}`);
            imagesLoaded++;
        }
        images[key] = img;
    }
}

// Resize Canvas
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Monster Class
class Monster {
    constructor() {
        this.type = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
        this.size = 80;
        this.x = Math.random() * (canvas.width - this.size);
        this.y = Math.random() * (canvas.height - this.size);
        // Base direction vector
        this.dirX = (Math.random() - 0.5) * 2;
        this.dirY = (Math.random() - 0.5) * 2;
        this.isBeingCaught = false;
        this.catchTimer = 0;
    }

    update() {
        if (this.isBeingCaught) {
            this.catchTimer++;
            return;
        }

        // Apply current speed multiplier
        // Divide by 4 to make the slider range (1-50) feel reasonable (4 being original speed)
        this.x += this.dirX * (speedMultiplier / 4);
        this.y += this.dirY * (speedMultiplier / 4);

        // Bounce
        if (this.x < 0 || this.x + this.size > canvas.width) this.dirX *= -1;
        if (this.y < 0 || this.y + this.size > canvas.height) this.dirY *= -1;

        // Randomly change direction
        if (Math.random() < 0.02) {
            this.dirX = (Math.random() - 0.5) * 2;
            this.dirY = (Math.random() - 0.5) * 2;
        }
    }

    draw() {
        if (this.isBeingCaught) {
            // Draw Ball
            const progress = this.catchTimer / 30;
            if (progress > 1) return;

            const size = this.size * (1 - progress);
            const centerX = this.x + this.size / 2;
            const centerY = this.y + this.size / 2;

            ctx.save();
            ctx.translate(centerX, centerY);

            // Shake effect
            if (this.catchTimer < 20) {
                ctx.rotate((Math.random() - 0.5) * 0.5);
            }

            if (images['ball'] && images['ball'].complete && images['ball'].naturalWidth !== 0) {
                ctx.drawImage(images['ball'], -this.size / 2, -this.size / 2, this.size, this.size);
            } else {
                // Ball Fallback
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#00f2ea';
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#00f2ea';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.stroke();
                ctx.shadowBlur = 0;
            }
            ctx.restore();
            return;
        }

        // Draw Monster
        if (images[this.type] && images[this.type].complete && images[this.type].naturalWidth !== 0) {
            ctx.drawImage(images[this.type], this.x, this.y, this.size, this.size);
        } else {
            // Placeholder
            ctx.fillStyle = this.getTypeColor();
            ctx.fillRect(this.x, this.y, this.size, this.size);
            ctx.fillStyle = 'white';
            ctx.fillText(this.type, this.x, this.y + 10);
        }
    }

    getTypeColor() {
        switch (this.type) {
            case 'chibikaiju': return '#f87171'; // Red-ish
            case 'teoku': return '#fbbf24'; // Yellow-ish
            case 'wanwan': return '#1f2937'; // Black-ish
            default: return 'gray';
        }
    }

    checkClick(mx, my) {
        if (this.isBeingCaught) return false;

        return (
            mx >= this.x &&
            mx <= this.x + this.size &&
            my >= this.y &&
            my <= this.y + this.size
        );
    }
}

// Particle System
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;
        this.life = 1.0;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.05;
    }
    draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
    }
}

function spawnMonster() {
    if (monsters.length < 8) {
        monsters.push(new Monster());
    }
}

function catchMonster(index) {
    const monster = monsters[index];

    // Check if already caught -> Game Over IMMEDIATELY
    if (caughtTypes.has(monster.type)) {
        gameOver();
        return;
    }

    monster.isBeingCaught = true;

    setTimeout(() => {
        // Success Logic
        caughtTypes.add(monster.type);
        updateUI();

        // Spawn particles
        for (let i = 0; i < 10; i++) {
            particles.push(new Particle(monster.x + monster.size / 2, monster.y + monster.size / 2, monster.getTypeColor()));
        }

        monsters.splice(index, 1);

        // Check Win
        if (caughtTypes.size === totalTypes) {
            gameWin();
        }
    }, 1000);
}

function updateUI() {
    uiCount.innerText = caughtTypes.size;
    slots.forEach(slot => {
        const type = slot.dataset.type;
        if (caughtTypes.has(type)) {
            slot.classList.add('caught');
        }
    });
}

function gameWin() {
    isGameActive = false;
    messageText.innerText = "COMPLETED!";
    messageText.style.color = '#00f2ea';
    messageArea.classList.remove('hidden');
}

function gameOver() {
    isGameActive = false;
    messageText.innerText = "GAME OVER\n(Duplicate Caught!)";
    messageText.style.color = '#ff0055';
    messageArea.classList.remove('hidden');
}

function resetGame() {
    caughtTypes.clear();
    monsters = [];
    particles = [];
    isGameActive = true;
    updateUI();
    slots.forEach(slot => slot.classList.remove('caught'));
    messageArea.classList.add('hidden');
    // Spawn initial monsters
    for (let i = 0; i < 5; i++) spawnMonster();
}

// Input Handling
canvas.addEventListener('click', (e) => {
    if (!isGameActive) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // Check hit (iterate backwards to click top ones first)
    for (let i = monsters.length - 1; i >= 0; i--) {
        if (monsters[i].checkClick(mx, my)) {
            catchMonster(i);
            break;
        }
    }
});

resetBtn.addEventListener('click', resetGame);

// Main Loop
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isGameActive && Math.random() < 0.05) spawnMonster();

    monsters.forEach(m => {
        m.update();
        m.draw();
    });

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) particles.splice(i, 1);
    }

    requestAnimationFrame(loop);
}

// Init
loadImages();
resetGame();
loop();
