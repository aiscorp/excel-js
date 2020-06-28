import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {defaultTitle} from '@/constants'
import * as actions from '@/redux/action'
import {debounce} from '@core/utils'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
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


  toHTML() {
    const title = this.store.getState().title || defaultTitle

    return `
        <input id="title" type="text" class="input" value="${title}"/>
          <div class="">
          <div class="button">
            <i class="material-icons">delete_outline</i>
          </div>
          <div class="button">
            <i class="material-icons">exit_to_app</i>
          </div>
      </div>
    `
  }
}
