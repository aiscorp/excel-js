export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error('$root must be provided for DomListener')
    }

    this.$root = $root
  }
}
