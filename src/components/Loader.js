import {$} from '@core/dom'

export function Loader() {
  const loader = `<div class="lds-dual-ring"></div>`

  return $.create('div', 'loader').html(loader)
}
