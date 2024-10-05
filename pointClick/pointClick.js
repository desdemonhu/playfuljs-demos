// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameObjects = [];
let inventory = [];

////// DIALOUGE - START //////
const dlog_onStart = 'This is the dlog that loads on game start';
const dlog_mirror_onClick = 'This is when you click on the mirror';


////// DIALOUGE - END //////

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

////// Backgrounds //////

/// TODO: set width and height dynamically based on index.html
addObject(0,0,800,600, '../assets/asset_bg-room.png', () =>{
    console.log('Background Image loaded') ;
})

////// Example of adding objects //////
/// TODO: set x and y of btn to a portion of the 'bg-lab' object
addObject(180, 200, 50, 50, '../assets/asset_bg-button.png', () => {
    console.log('Demo-Inventory-Item clicked');
    addItemToInventory('Demo-Inventory-Item');
});

/// TODO: Make all scene objects
/// TODO: Object actions/ state flags
const stateMachine = {
    'none': 'none',
    'start': onStart,
    'end': 'end',
    'success': 'success',
    'defeat': 'defeat',
    'investigation': 'investigation',
    'action': 'action',
    'clear': 'clear'
}

// Handle State change
function changeState (currentState){
    switch (currentState) {
        case 'none':
            break;
        case 'start':
            stateMachine['start']();
            break;
        default:
            break;
    }
    console.log('currentState is:', currentState);
}

////// State Functions - START //////

// stateMachine['start']:
function onStart () {
    console.log('in onStart: ', dlog_onStart);
}

////// State Functions - END //////


///// onLoad //////
console.info('version', .15);
draw();
changeState('start');
