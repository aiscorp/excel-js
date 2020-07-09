import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {defaultTitle} from '@/constants'
import * as actions from '@/redux/action'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      subscribe: ['title'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 500)
  }

  init() {
    super.init()
    this.$title = this.$root.find('#title')
  }

  onInput(event) {
    this.$dispatch(actions.titleChange(this.$title.text()))
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.type === 'button') {
      const action = $target.data.action
      let decision
      // const prevState = !!this.state[$target.data.action]

      switch (action) {
        case 'delete':
          decision = confirm('Do you really want to delete this table?')
          if (decision) {
            localStorage.removeItem('excel:' + ActiveRoute.param)
            ActiveRoute.navigate('')
          }
          break
        case 'exit':
          ActiveRoute.navigate('')
          break
        default:
          console.log('Action not found: ' + $target.data.action)
      }
    }
  }


  toHTML() {
    const title = this.store.getState().title || defaultTitle
    const titleHtml = `
        <input id="title" type="text" class="input" value="${title}"/>`

    const buttons = [
      {type: 'spacer'},
      {icon: 'delete_outline', action: 'delete'},
      {icon: 'exit_to_app', action: 'exit'}]

    const buttonHtml = `
        <div class="">${buttons.map(createButton).join('')}</div>`

    return titleHtml + buttonHtml
  }
}

function createButton(element) {
  const metaData = `data-type="button" data-action="${element.action}"`
  const active = `${element.active ? 'active' : ''}`

  const button = `
        <div class="button ${active}" ${metaData}>
            <i class="material-icons" ${metaData}>${element.icon}</i>
        </div>`
  const spacer = `<div class="spacer"></div>`

  return element.type === 'spacer' ? spacer : button
}
