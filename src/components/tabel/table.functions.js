import {range} from '@core/utils'

export function isResize(event) {
  return !!event.target.dataset.resize
  // code in bottom the same 
  // if (event.target.dataset.resize) {
  //   return true
  // }
  // return false
}

export function isCellClick(event) {
  return event.target.dataset.type === 'cell'
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
