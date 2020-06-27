// Makes first letter upper case
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  // return string.charAt(0).toUpperCase() + string.slice(1)
  return string.replace(string[0], string[0].toUpperCase())
}

// !!! bug in function range() !!!
export function range(start, end) {
  try {
    if (+start > +end) {
      return new Array(+start - end + 1)
        .fill('')
        .map((_, index) => (+end + index))
    } else {
      return new Array(+end - start + 1)
        .fill('')
        .map((_, index) => (+start + index))
    }
  } catch (e) {
    console.warn(`Selection ERROR in range(${start}, ${end} 
      {start > end: ${+start - end + 1}}, {start < end: ${+end - start + 1}}`)
  }

}

// parse '123:567' to {row: 123, col: 567}
export function parseCellId(textId) {
  const t = textId.split(':')
  return {
    row: +t[0],
    col: +t[1]
  }
}

// storage GET/SET
export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

// Deep comparison of two objects in a simple way
export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}
