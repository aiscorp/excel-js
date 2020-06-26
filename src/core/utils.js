// Pure functions

// Makes first letter upper case
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  // return string.charAt(0).toUpperCase() + string.slice(1)
  return string.replace(string[0], string[0].toUpperCase())
}

export function range(start, end) {
  // eslint-disable-next-line no-undef
  if (start > end) {
    return new Array(+start - end + 1)
      .fill('')
      .map((_, index) => (+end + index))
  } else {
    return new Array(+end - start + 1)
      .fill('')
      .map((_, index) => (+start + index))
  }
}

export function parseCellId(textId) {
  const t = textId.split(':')
  return {
    row: +t[0],
    col: +t[1]
  }
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}
