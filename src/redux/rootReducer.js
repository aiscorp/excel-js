import * as types from '@/redux/types'

export function rootReducer(state, action) {
  let prevState
  let field
  let id
  switch (action.type) {
    case types.TABLE_RESIZE:
      id = action.data.id
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      return {...state, [field]: value(state, field, id, action)}

    case types.TABLE_TEXT_CHANGE:
      id = action.data.id.row + ':' + action.data.id.col
      field = 'cellState'
      return {...state, currentText: action.data.value,
        [field]: value(state, field, id, action)}

    case types.TABLE_STYLE_CHANGES:
      return {...state, currentStyles: action.data}

    default:
      return state
  }
}

function value(state, type, id, action) {
  const val = state[type] || {}
  val[id] = action.data.value
  return val
}
