import {$} from '@core/dom'
import {ActiveRoute} from '@core/routes/ActiveRoute'
import {Loader} from '@/components/Loader'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is required')
    }

    this.$placeholder = $(selector)
    this.routes = routes

    this.loader = new Loader()

    this.page = null

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  async changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }

    this.$placeholder
      .clear()
      .append(this.loader)

    const Page = ActiveRoute.path.includes('excel') ?
      this.routes.excel : this.routes.dashboard

    this.page = new Page(ActiveRoute.param)

    const root = await this.page.getRoot()

    this.$placeholder
      .clear()
      .append(root)

    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
