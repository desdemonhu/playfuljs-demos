// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameObjects = [];
let inventory = [];

class GameObject {
    constructor(x, y, width, height, imageSrc, onClick) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
        this.onClick = onClick;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width &&
               mouseY >= this.y && mouseY <= this.y + this.height;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameObjects.forEach(object => object.draw());
    requestAnimationFrame(draw);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    gameObjects.forEach(object => {
        if (object.isClicked(mouseX, mouseY)) {
            object.onClick();
        }
    });
});

function addObject(x, y, width, height, imageSrc, onClick) {
    const gameObject = new GameObject(x, y, width, height, imageSrc, onClick);
    gameObjects.push(gameObject);
}

function addItemToInventory(item) {
    inventory.push(item);
    const inventoryDiv = document.getElementById('inventory');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'inventory-item';
    itemDiv.textContent = item;
    inventoryDiv.appendChild(itemDiv);
}

// Example of adding objects
addObject(100, 100, 50, 50, '../assets/asset_bg-button.png', () => {
    console.log('Object 1 clicked');
    addItemToInventory('Key');
});
addObject(200, 200, 50, 50, 'assets/asset_bg-room.png', () => {
    console.log('Object 2 clicked');
});

draw();
