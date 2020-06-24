const CODES = {
  A: 65,
  Z: 90
}

const COLS = CODES.Z - CODES.A + 1

export function createTable(rowsCount = 60) {
  const colsCount = COLS
  const rows = []

  for (let row = 0; row <= rowsCount; row++) {
    let cols

    if (row === 0) {
      cols = new Array(colsCount)
        .fill('')
        .map(toHeaderChar)
        .map(createCol)
        .join('')
    } else {
      cols = new Array(colsCount)
        .fill('')
        // .map((col = '', index) =>
        //   createCell(col, index, row))
        .map(createCell(row))
        .join('')
    }
    rows.push(createRow(row, cols))
  }

  return rows.join('')
}

function createRow(index, content) {
  const resizer = index ?
    '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable">
        <div class="row-info">
        ${index === 0 ? '' : index}        
        ${resizer}
        </div>
        <div class="row-data">
        ${content}
        </div>
    </div>
  `
}

function createCol(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index+1}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createCell(row) {
  return function(cell, col) {
    return `
    <div class="cell" contenteditable 
        data-col="${col+1}" 
        data-row="${row}"
        data-type="cell">
        ${cell}${row}:${col+1}
    </div>
  `
  }
}

function toHeaderChar(_, index) {
  if (typeof index !== 'number' || index > COLS) {
    return 'Err'
  }

  return String.fromCharCode(CODES.A + index)
}
