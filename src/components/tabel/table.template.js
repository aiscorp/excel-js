const CODES = {
  A: 65, Z: 90
}
const COLS = CODES.Z - CODES.A + 1

export function createTable(state = {}) {
  console.log(state)
  const rowsCount = 60
  const colsCount = COLS
  const rows = []

  for (let row = 0; row <= rowsCount; row++) {
    let cols

    if (row === 0) {
      cols = new Array(colsCount)
        .fill('')
        .map(toHeaderChar)
        .map(withColState(state, row))
        .map(createCol)
        .join('')
    } else {
      cols = new Array(colsCount)
        .fill('')
        .map(withCellState(state, row))
        .map(withColState(state, row))
        .map(createCell)
        .join('')
    }
    rows.push(createRow(withRowState(state, row, cols)))
  }

  return rows.join('')
}

function createRow({index, height, content}) {
  const resizer = index ?
    `<div class="row-resize" 
          data-resize="row">            
     </div>` :
    ''
  return `
    <div class="row" 
         style="height: ${height}"
         data-type="resizable" 
         data-row="${index}">
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

function createCol({val, index, row, width}) {
  return `
    <div class="column" style="width: ${width}"
        data-type="resizable" data-col="${index + 1}">
        ${val}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createCell({val, index, row, width}) {
    return `
    <div class="cell" contenteditable
        style="width: ${width}"
        data-col="${index + 1}" 
        data-row="${row}"
        data-type="cell">
        ${val}
    </div>
  `
}

function toHeaderChar(_, index) {
  if (typeof index !== 'number' || index > COLS) {
    return 'Err'
  }
  return {
    val: String.fromCharCode(CODES.A + index),
    index
  }
}


function withColState(state, row) {
  return function({val, index}) {
    return {
      val, index, row,
      width: (state.colState[index + 1] + 'px') || ''
    }
  }
}

function withRowState(state, row, content) {
  return {
    index: row,
    height: (state.rowState[row] + 'px') || '',
    content
  }
}

function withCellState(state, row) {
  return function(val, index) {
    const id = row + ':' + (+index+1)
    return {
      val: (state.cellState[id]) || '',
      index
    }
  }
}
