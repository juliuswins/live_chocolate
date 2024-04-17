const gridContainer = document.getElementById('grid-container');
const gridSize = 20;

// Functions to create the grid, handle mode logic, and click events will be added here.

function createGrid() {
    for (let row = 0; row < gridSize; row++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');

        for (let col = 0; col < gridSize; col++) {
            const gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell'); 

            // Add a data attribute to store cell state
            gridCell.dataset.element = 'empty';

            gridRow.appendChild(gridCell);
        }

        gridContainer.appendChild(gridRow);
    }
}

createGrid(); // Call the function to generate the grid

let currentMode = 'draw'; // Initial mode

const drawModeButton = document.getElementById('draw-mode');
const eraseModeButton = document.getElementById('erase-mode');

drawModeButton.addEventListener('click', () => { currentMode = 'draw'; });
eraseModeButton.addEventListener('click', () => { currentMode = 'erase'; });

const elementsList = ['air', 'earth', 'fire', 'moon', 'sun', 'water', 'speedup', 'slowdown'];

function handleClick(row, col) {

    const cell = parent.gridContainer.children[row].children[col];
    if (currentMode === 'draw') {
        addElement(cell);
    } else if (currentMode === 'erase') {
        removeElement(cell);
    }
}

function addElement(cell) {
    const randomIndex = Math.floor(Math.random() * elementsList.length);
    const newElement = elementsList[randomIndex];
    cell.dataset.element = newElement; // Update the state
    cell.classList.add(newElement); // Add the element class visually
    // Create image element and add it to the cell
    const elementImage = document.createElement('img');
    elementImage.src = `images/${newElement}.png`; // Construct image path
    elementImage.classList.add('grid-element'); // Add a class for styling
    cell.appendChild(elementImage);
}

function removeElement(cell) {
    cell.dataset.element = 'empty';
    cell.classList.remove(...cell.classList); // Remove all classes 
}

// Event listener for grid cells outside of createGrid
gridContainer.addEventListener('click', (event) => { 
    if (event.target.classList.contains('grid-cell')) { // Check for 'grid-cell'
        const cell = event.target;
        const row = cell.parentNode.rowIndex;  
        const col = cell.cellIndex;
        handleClick(row, col);
    }
});