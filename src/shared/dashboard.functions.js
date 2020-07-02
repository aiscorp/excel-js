import {storage} from '@core/utils'

export function listElement(model, id, user) {
  // NEED TO REFACTOR TO USE StateProcessor
  const date = new Date(model.lastDate)

  return `
    <li class="dash-board__record">
      <a href="#excel/${user}/${id}">${model.title}</a>
      <strong>${date.toLocaleString()}</strong>
    </li>
  `
}

export function listEmpty() {
  return `
    <li class="dash-board__record">        
      <a href="#">No tables created.</a>      
    </li>
  `
}

// export function listElement(k) {
//   // NEED TO REFACTOR TO USE StateProcessor
//   const model = storage(k)
//   const id = k.split(':')[1]
//   const date = new Date(model.lastDate)
//
//   return `
//     <li class="dash-board__record">
//       <a href="#excel/${id}">${model.title}</a>
//       <strong>${date.toLocaleString()}</strong>
//     </li>
//   `
// }

// function getAllKeys() {
//   const keys = []
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i)
//     if (!key.includes('excel:')) {
//       continue
//     }
//     keys.push(key)
//   }
//   return keys
// }

// export function createRecordsTable(state) {
//   const empty = `<ul class="dash-board__list">${listEmpty()}</ul>`
//   const keys = getAllKeysDB(state)
//
//   if (!keys.length) {
//     return empty
//   }
//
//   return `
//     <div class="dash-board__table">
//       <div class="dash-board__list-header">
//         <span>Name</span>
//         <span>Last date</span>
//       </div>
//       <ul class="dash-board__list">
//         ${keys.map(k => listElement(k)).join('')}
//       </ul>
//     </div>
//   `
// }

function getAllKeysDB(state) {
  return Object.keys(state)
}

export function createRecordsTable(state, user) {
  const empty = `<ul class="dash-board__list">${listEmpty()}</ul>`
  const keys = getAllKeysDB(state)
  console.log(keys)
  console.log()
  keys.map(k => console.log(state[k]))

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
        ${keys.map(k => listElement(state[k], k, user)).join('')}
      </ul>        
    </div>
  `
}

