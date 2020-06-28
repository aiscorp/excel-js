import {range} from '@core/utils'

export function isResize(event) {
  return !!event.target.dataset.resize
}

export function isCellClick(event) {
  return event.target.dataset.type === 'cell'
}

export function isGroupSelection($current, $target) {
  return $current.id().col !== $target.id().col ||
    $current.id().row !== $target.id().row
}

export function findByCoords($root, coords) {
  return $root.find(`.cell[data-col="${coords.col}"][data-row="${coords.row}"]`)
}

export function matrix($target, $current) {
  const current = $current.id()
  const target = $target.id()

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push({'row': row, 'col': col}))
    return acc
  }, [])
}

export function nextSelector(key, {row, col}) {
  const BORDER = {
    row: 60,
    col: 26
  }
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row < BORDER.row ? row++ : BORDER.row
      break
    case 'Tab':
    case 'ArrowRight':
      col < BORDER.col ? col++ : BORDER.col
      break
    case 'ArrowLeft':
      col > 1 ? col-- : 1
      break
    case 'ArrowUp':
      row > 1 ? row-- : 1
      break
  }
  return {row, col}
}

export function stateToStyle(state) {
  const styles = {}
  Object.keys(state).forEach(key => {
    switch (key) {
      case 'cell-left':
        state[key] ? styles.textAlign = 'left' : ''
        break
      case 'cell-right':
        state[key] ? styles.textAlign = 'right' : ''
        break
      case 'cell-center':
        state[key] ? styles.textAlign = 'center' : ''
        break
      case 'cell-bold':
        state[key] ? styles.fontWeight = 'bold' : styles.fontWeight = 'normal'
        break
      case 'cell-italic':
        state[key] ? styles.fontStyle = 'italic' : styles.fontStyle = 'normal'
        break
      case 'cell-underline':
        state[key] ? styles.textDecoration = 'underline' :
          styles.textDecoration = 'none'
        break
      case 'cell-erase':
        break
    }
  })
  return styles
}

export function styleToState(styles) {
  const state = {}
  Object.keys(styles).forEach(key => {
    switch (key) {
      case 'textAlign':
        styles[key] === 'left' ? state['cell-left'] = true :
          state['cell-left'] = false
        styles[key] === 'right' ? state['cell-right'] = true :
          state['cell-right'] = false
        styles[key] === 'center' ? state['cell-center'] = true :
          state['cell-center'] = false
        break
      case 'fontWeight':
        styles[key] === 'bold' ? state['cell-bold'] = true :
          state['cell-bold'] = false
        break
      case 'fontStyle':
        styles[key] === 'italic' ? state['cell-italic'] = true :
          state['cell-italic'] = false
        break
      case 'textDecoration':
        styles[key] === 'underline' ? state['cell-underline'] = true :
          state['cell-underline'] = false
        break
      case 'cell-erase':
        break
    }
  })
  return state
}
