window.addEventListener('load', function() {
    renderGrid(5, 5);
})

window.addEventListener('mousedown', function() {
    mouseIsDown = true;
})
window.addEventListener('mouseup', function() {
    mouseIsDown = false;
});
let mouseIsDown = false;

const renderGrid = (rows, columns) => {
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('DIV');
        row.className = 'row';
        row.style.height = `${100 / rows}%`
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement('DIV');
            cell.className = 'cell';
            cell.style.width = `${100 / columns}%`;
            cell.addEventListener('click', function(e) {
                colorIn(e.target);
            })
            cell.addEventListener('mouseover', function(e) {
                if (!mouseIsDown) return;
                colorIn(e.target);
            })
            row.appendChild(cell);
        }
        document.getElementById('grid').appendChild(row);
    }
}

const addRow = () => {

    const grid = document.getElementById('grid');
    // how many cells do we need to add?

    let cellsToAdd = rowLength();
    
    // add that many cells to the bottom of the grid
    const row = document.createElement('DIV');
    row.className = 'row';

    for (let i = 0; i < cellsToAdd; i++) {
        const cell = document.createElement('DIV');
            cell.className = 'cell';
            cell.addEventListener('click', function(e) {
                colorIn(e.target);
            });
            cell.addEventListener('mouseover', function(e) {
                if (!mouseIsDown) return;
                colorIn(e.target);
            })
            row.appendChild(cell);
    }
    grid.appendChild(row);
    resizeCells();
}

const resizeCells = () => {
    // debugger;
    const cellWidth = `${100 / rowLength()}%`
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.width = cellWidth;
    })
    const rows = document.querySelectorAll('.row');
    rows.forEach(row => {
        row.style.height = `${100 / rows.length}%`
    });
}


const rowLength = () => document.getElementById('grid').firstChild.childNodes.length;

const removeRow = () => {
    const grid = document.getElementById('grid');
    if (grid.childNodes.length === 1) return;
    grid.lastChild.remove();
    resizeCells();
}

const addColumn = () => {
    document.querySelectorAll('.row').forEach(row => {
        const cell = document.createElement('DIV');
        cell.className = 'cell';
        cell.addEventListener('click', function(e) {
            colorIn(e.target);
        });
        cell.addEventListener('mouseover', function(e) {
            if (!mouseIsDown) return;
            colorIn(e.target);
        })
        row.appendChild(cell);
    });
    resizeCells();
}

const removeColumn = () => {
    const rows = document.querySelectorAll('.row');
    console.log(rows.childNodes);
    if (rows[0].childNodes.length === 1) return;
    rows.forEach(row => {
        row.lastChild.remove();
    });
    resizeCells();
}

const toggleColorSelect = (element) => {
    document.querySelectorAll('.color').forEach(color => {
        color.classList.remove('selected');
        color.dataset.selected = 'false';
    })
    const evaluatedData = eval(element.dataset.selected)
    element.classList.toggle('selected');
    element.dataset.selected = !eval(evaluatedData);
}

const colorIn = (box) => {
    console.log(document.querySelectorAll('.color'));
    box.style.backgroundColor = [...document.querySelectorAll('.color')].filter(color => {
        return color.dataset.selected === 'true';
    })[0].dataset.color;
}
