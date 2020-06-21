const CODES = {
  A: 65,
  Z: 90
}

const COLS = CODES.Z - CODES.A + 1


export function createTable(rowsCount = 60) {
  const colsCount = COLS
  const rows = []

  for (let i = 0; i <= rowsCount; i++) {
    let cols

    if (i == 0) {
      cols = new Array(colsCount)
        .fill('')
        .map(toHeaderChar)
        .map(createCol)
        .join('')
    } else {
      cols = new Array(colsCount)
        .fill('')
        // .map(toHeaderChar)
        .map(createCell)
        .join('')
    }
    rows.push(createRow(i, cols))
  }

  return rows.join('')
}

function createRow(index, content) {
  return `
    <div class="row">
        <div class="row-info">
        ${index == 0 ? '' : index}
        </div>
        <div class="row-data">
        ${content}
        </div>
    </div>
  `
}

function createCol(col) {
  return `
    <div class="column">
        ${col}
    </div>
  `
}

function createCell(cell) {
  return `
    <div class="cell" contenteditable>
        ${cell}
    </div>
  `
}

function toHeaderChar(_, index) {
  if (typeof index !== 'number' || index > COLS) {
    return 'Err'
  }

  return String.fromCharCode(CODES.A + index)
}
