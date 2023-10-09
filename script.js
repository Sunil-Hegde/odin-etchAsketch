const drawingBox = document.querySelector('.drawingBox');

function createGrid(order) {
    for (let i = 0; i < order; i++) {
        const gridSquareColumn = document.createElement('div');
        gridSquareColumn.classList.add('grid-square-column'); 
        drawingBox.appendChild(gridSquareColumn);
        for(let j = 0; j < order; j++){
            const gridSquareRow = document.createElement('div');
            gridSquareRow.classList.add('grid-square-row'); 
            gridSquareColumn.appendChild(gridSquareRow);
        }
    }
}


createGrid(16);
