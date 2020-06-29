// Makes first letter upper case
import {defaultStyles} from '@/constants'

export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  // return string.charAt(0).toUpperCase() + string.slice(1)
  return string.replace(string[0], string[0].toUpperCase())
}

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

export function camelToDashCase(string) {
 return string.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
    .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
    .join('; ')
}

export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args)
      // fn(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function hashCode(s) {
  return s.split('').reduce(function(a, b) {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function formatDate(date) {

  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}
