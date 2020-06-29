import {storage} from '@core/utils'

export function listElement(k) {
  const model = storage(k)
  const id = k.split(':')[1]
  const date = new Date(model.lastDate)

  return `
    <li class="dash-board__record">
      <a href="#excel/${id}">${model.title}</a>
      <strong>${date.toLocaleString()}</strong>
    </li>
  `
}

export function listEmpty() {
  return `
    <li class="dash-board__record">        
      <a href="#excel">No tables created, create?</a>      
    </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel:')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const empty = `<ul class="dash-board__list">${listEmpty()}</ul>`
  const keys = getAllKeys()

  if (!keys.length) {
    return empty
  }

  return `
    <div class="dash-board__table">
      <div class="dash-board__list-header">
        <span>Name</span>
        <span>Last date</span>
      </div> 
      <ul class="dash-board__list">
        ${keys.map(k => listElement(k)).join('')}
      </ul>        
    </div>
  `
}

