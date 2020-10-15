export function parse(value = '') {
  if (value.startsWith('=')) {
    const formula = value.slice(1)

    try {
      console.log(eval(formula))
      return eval(formula)
    } catch (e) {
      console.warn(`Formula ${formula} cannot be calculated`)
      return value // 'Err: '+formula
    }
  }
  return value
}
