let color = 'black';
let click = false;

const colorSelector = document.querySelector('.color-selector');
colorSelector.oninput = (e) => changeColor(e.target.value);

function createBoard(size) {
    let board = document.querySelector('.board');
    let squares = board.querySelectorAll('div');
    squares.forEach((div) => div.remove());

    // create an n x n grid for the sketchpad (can change size later)
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size ** 2; i++) {
        let square = document.createElement('div');
        square.addEventListener('mouseover', colorSquare);
        square.style.backgroundColor = 'white';
        board.insertAdjacentElement('beforeend', square);
        square.classList.add('editable');
    }
};

createBoard(100);

function changeSize(newSize) {
    if (newSize <= 1 || newSize >= 101) {
        document.querySelector('.error').style.display = 'flex';
    } else {
        document.querySelector('.error').style.display = 'none';
        createBoard(newSize);
    }
};

function colorSquare() {
    if (click) {
        if (color === 'random') {
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        } else {
            this.style.backgroundColor = color;
        }
    }
};

function changeColor(choice) {
    color = choice;
};

function resetBoard() {
    let board = document.querySelector('.board');
    let squares = board.querySelectorAll('div');
    squares.forEach((div) => div.style.backgroundColor = 'white');
};

document.querySelector('body').addEventListener('click', (e) => {
    if (e.target.className == 'editable') {
        if (click) {
            document.querySelector('.mode').textContent = 'Mode: Pen Up';
        } else {
            document.querySelector('.mode').textContent = 'Mode: Pen Down';
        }
        click = !click;
    }
});