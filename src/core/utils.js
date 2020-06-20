// Pure functions

// Makes first letter upper case
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  // return string.charAt(0).toUpperCase() + string.slice(1)
  return string.replace(string[0], string[0].toUpperCase())
}
