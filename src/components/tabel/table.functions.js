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
