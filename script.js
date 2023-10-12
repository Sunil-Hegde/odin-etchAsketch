const drawingBox = document.querySelector('.drawingBox');
const gridSizeInput = document.getElementById('gridSize');
const bgColorPicker = document.getElementById('bgColorPicker');
const penColorPicker = document.getElementById('penColorPicker');
const penColorSpan = document.getElementById('penColor');
const gridToggleCheckbox = document.getElementById('gridToggle');
const eraserButton = document.querySelector('.eraser button');
const clearAllButton = document.querySelector('.clearAll button');
const sliderValueSpan = document.getElementById('sliderValue');
const rainbowPenButton = document.querySelector('.rainbowPen button');
//default:
drawingBox.style.backgroundColor = '#ffffff';
let penColor = '#000000'; // Default pen color is black
penColorPicker.value = penColor;
let rainbowPenActive = false;
//functions:
function createGrid(order) {
    drawingBox.innerHTML = '';
    const numRows = order;
    const numCols = order;
    document.documentElement.style.setProperty('--order', order);
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('grid-square');
            drawingBox.appendChild(gridSquare);
        }
    }
    sliderValueSpan.textContent = order;
    attachEventListenersToGridSquares();
}
function attachEventListenersToGridSquares() {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if (rainbowPenActive) {
                drawRainbow(square);
            } else {
                draw(square);
            }
        });
        square.addEventListener('mouseover', (event) => {
            if (event.buttons === 1) {
                if (rainbowPenActive) {
                    drawRainbow(square);
                } else {
                    draw(square);
                }
            }
        });
    });
}
function draw(square) {
    if (eraserActive) {
        square.style.backgroundColor = drawingBox.style.backgroundColor;
    } else {
        square.style.backgroundColor = penColor;
    }
}
function drawRainbow(square) {
    if (eraserActive) {
        square.style.backgroundColor = drawingBox.style.backgroundColor;
    } else {
        const currentColor = square.style.backgroundColor;
        if (currentColor === '' || currentColor === drawingBox.style.backgroundColor) {
            const rainbowColor = getRandomRainbowColor();
            square.style.backgroundColor = rainbowColor;
        }
    }
}
function getRandomRainbowColor() {
    const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
    const randomIndex = Math.floor(Math.random() * rainbowColors.length);
    return rainbowColors[randomIndex];
}
let eraserActive = false;
//eventListeners:
//eraser
eraserButton.addEventListener('click', () => {
    eraserActive = !eraserActive;
    if (eraserActive) {
        eraserButton.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
        penColorSpan.textContent = 'Eraser';
        penColorPicker.style.display = 'none';
    } else {
        eraserButton.style.backgroundColor = '';
        penColorSpan.textContent = penColor;
    }
});
//clearAll
clearAllButton.addEventListener('click', () => {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach(square => {
        square.style.backgroundColor = drawingBox.style.backgroundColor;
    });
    penColor = '#000000';
    penColorPicker.value = penColor;
    penColorSpan.textContent = penColor;
    rainbowPenActive = false;
    rainbowPenButton.style.backgroundColor = '';
    penColorPicker.style.display = 'block';
    eraserActive = false;
    eraserButton.style.backgroundColor = '';
    penColorSpan.textContent = penColor;
    attachEventListenersToGridSquares();
});
//rainbowPen
rainbowPenButton.addEventListener('click', () => {
    rainbowPenActive = !rainbowPenActive;
    if (rainbowPenActive) {
        rainbowPenButton.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
        penColorSpan.textContent = 'Rainbow Pen';
        penColorPicker.style.display = 'none';
    } else {
        rainbowPenButton.style.backgroundColor = '';
        penColorSpan.textContent = penColor;
        penColorPicker.style.display = 'block';
    }
});
createGrid(16);
//sliderInput
gridSizeInput.addEventListener('input', function () {
    const gridSize = gridSizeInput.value;
    createGrid(gridSize);
});
//bgColourPicker
bgColorPicker.addEventListener('input', function () {
    const selectedColor = bgColorPicker.value;
    drawingBox.style.backgroundColor = selectedColor;
});
//penColourPicker
penColorPicker.addEventListener('input', function () {
    penColor = penColorPicker.value;
    penColorSpan.textContent = penColor;
});
//gridToggle
gridToggleCheckbox.addEventListener('change', function () {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach(square => {
        square.classList.toggle('hide-border');
    });
});
