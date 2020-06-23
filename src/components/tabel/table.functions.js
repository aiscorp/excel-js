
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
