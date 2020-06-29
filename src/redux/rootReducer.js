import * as types from '@/redux/types'

export function rootReducer(state, action) {
  let prevState
  let field
  let id
  let val

  switch (action.type) {
    case types.TABLE_RESIZE:
      id = action.data.id
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      return {...state, [field]: value(state, field, id, action)}

    case types.TABLE_TEXT_CHANGE:
      id = action.data.id.row + ':' + action.data.id.col
      field = 'cellState'
      return {
        ...state, currentText: action.data.value,
        [field]: value(state, field, id, action)
      }

    case types.TABLE_STYLE_CHANGES:
      return {...state, currentStyles: action.data}

    case types.TABLE_STYLE_APPLY:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.forEach(ids => {
        id = ids.row + ':' + ids.col
        // val[id.row + ':' + id.col] = toInlineStyles(action.data.value)
        val[id] = {...val[id], ...action.data.value}
      })
      console.log('action.data:', action.data.value)
      console.log('field:', val)
      return {
        ...state, [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value}
      }

    case types.TITLE_CHANGE:
      return {...state, title: action.data}

    case types.UPDATE_DATE:
      return {...state, lastDate: new Date().toJSON()}

    default:
      return state
  }
}

function value(state, field, id, action) {
  const val = state[field] || {}
  val[id] = action.data.value
  return val
}
