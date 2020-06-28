import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {createToolbar} from '@/components/toolbar/toolbar.template'
import {$} from '@core/dom'
import {defaultStyles} from '@/constants'
import {styleToState} from '@/components/tabel/table.functions'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click', 'dblclick'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  prepare() {
    const initialState = styleToState(defaultStyles)
    this.initState(initialState)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged({currentStyles}) {
    console.log(currentStyles)
    this.setState(currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)
    
    if ($target.data.type === 'button') {
      const action = $target.data.action
      const prevState = !!this.state[$target.data.action]

      switch (action) {
        case 'cell-left':
        case 'cell-right':
        case 'cell-center':
          this.toggleLeftRightCenter(action, prevState)
          break
        case 'cell-bold':
          this.toggle(action, prevState)
          break
        case 'cell-italic':
          this.toggle(action, prevState)
          break
        case 'cell-underline':
          this.toggle(action, prevState)
          break
        case 'cell-erase':
          this.$emit('table:textChange', '')
          this.$emit('formula:input', '')
          break

        default:
          console.log('Action not found: ' + $target.data.action)
      }
      this.$emit('toolbar:stateChange', this.state)
    }
  }

  onDblclick(event) {
    console.log('Double!')
  }

// changing to ON or OFF state (true/false)
  toggle(action, prevState) {
    this.setState({[action]: !prevState})
  }

  // changing to ON or OFF state (true/false)
  toggleLeftRightCenter(action, prevState) {
    // if prevState = TRUE, we don't need to switch
    if (!prevState) {
      switch (action) {
        case 'cell-left':
          this.setState({'cell-left': true,
            'cell-right': false, 'cell-center': false})
          break
        case 'cell-right':
          this.setState({'cell-left': false,
            'cell-right': true, 'cell-center': false})
          break
        case 'cell-center':
          this.setState({'cell-left': false,
            'cell-right': false, 'cell-center': true})
          break
      }
    }
  }
}

