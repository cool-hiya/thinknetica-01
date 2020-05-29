'use strict';

function createEditor({cellSize, colors}) {
    const canvas = document.querySelector('.canvas');
    const palette = document.querySelector('.colors');

    if (!canvas || !palette) {
        return;
    }

    createPalette(palette, colors);
    createCanvas(canvas, cellSize);
}

function createCanvas(canvas, cellSize) {
    const countX = Math.ceil(window.innerWidth / cellSize);
    const countY = Math.ceil(window.innerHeight / cellSize);

    new Array(countY).fill('').forEach(el => {
        const row = document.createElement('tr');
        canvas.append(createCells(row, countX));
    })
}

function createCells(row, number) {
    new Array(number).fill('').forEach(c => {
        const cell = document.createElement('td');
        const content = document.createElement('div');
        cell.addEventListener('click', () => {onCellSelected(cell)});
        cell.append(content);
        row.append(cell);
    })
    return row;
}

function createPalette(palette, colors) {
    colors.forEach(c => {
        const color = document.createElement('div');
        color.dataset.color = c;
        color.style.backgroundColor = c;
        color.addEventListener('click', () => {onColorSelected(color)});
        palette.append(color);
    })
}

function onColorSelected(color) {
    const activeColorEl = document.querySelector('.active-color');

    activeColorEl.style.backgroundColor = color.dataset.color;
    activeColorEl.dataset.color = color.dataset.color;
}

function onCellSelected(cell) {
    const activeColorEl = document.querySelector('.active-color');
    cell.style.backgroundColor = activeColorEl.dataset.color;

    if (event.ctrlKey) {
        cell.style.backgroundColor = 'white';
    }
}

const config = {
    cellSize: 30,
    colors: ['red', 'blue', 'white', 'black', 'pink', 'orange', 'yellow', 'green', 'gold', 'gray', 'cyan', 'navy', 'violet', 'brown', 'silver', 'fuchsia', 'tomato', 'royalblue', 'greenyellow', 'rosybrown', 'lightgreen']
};

createEditor(config);
