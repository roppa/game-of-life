let width = 40;

function getCells() {
  return new Array(width * width).fill(false);
}

let cells = getCells();

cells[1] = true;
cells[2] = true;
cells[6] = true;
cells[30] = true;
cells[31] = true;
cells[26] = true;
cells[51] = true;
cells[52] = true;
cells[53] = true;
cells[54] = true;
cells[125] = true;
cells[126] = true;
cells[145] = true;
cells[146] = true;
cells[167] = true;
cells[168] = true;
cells[187] = true;
cells[188] = true;
cells[221] = true;
cells[222] = true;
cells[223] = true;
cells[382] = true;
cells[403] = true;
cells[421] = true;
cells[422] = true;
cells[423] = true;

// Any live cell with fewer than two live neighbours dies, as if by underpopulation
// Any live cell with two or three live neighbours lives on to the next generation
// Any live cell with more than three live neighbours dies, as if by overpopulation
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction
function getCell(cell, neighbours) {
  return cell && neighbours === 2 || neighbours === 3
}

function regenerate() {
  let newCells = [];
  for (let i = 0, w = 0; i < width * width; i++) {
    let neighbours = [
      cells[i - (width - 1)],
      cells[i - width],
      cells[i - (width + 1)],
      cells[i - 1],
      cells[i + 1],
      cells[i + (width - 1)],
      cells[i + width],
      cells[i + (width + 1)]
    ].reduce((curr, next) => (next ? curr + 1 : curr), 0);

    newCells.push(getCell(cells[i], neighbours));
  }
  cells = newCells;
}

function drawGrid() {
  let updated = document.createElement("div");
  updated.className = "board";
  const num = [];
  let curr = 0;
  for (let i = 0; i < width; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let w = 0; w < width; w++) {
      let square = document.createElement("div");
      square.className = "square";
      num.push(curr);
      if (cells[curr]) {
        square.className = "square alive";
      }
      ++curr;
      row.appendChild(square);
    }
    updated.appendChild(row);
  }
  let grid = document.getElementById("grid");
  grid.innerHTML = "";
  grid.appendChild(updated);
}