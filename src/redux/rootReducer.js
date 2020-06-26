import * as types from '@/redux/types'

export function rootReducer(state, action) {
  let prevState
  let type
  switch (action.type) {
    case types.TABLE_RESIZE:
      type = action.data.type === 'col' ? 'colState' : 'rowState'
      prevState = state[type] || {}
      prevState[action.data.id] = action.data.value
      return {...state, [type]: prevState} // id:value
          // switch (action.data.type) {
          //   case 'col':
          //     prevState = state.colState || {}
          //     prevState[action.data.id] = action.data.value
          //     return {...state, colState: prevState} // id:value
          //   case 'row':
          //     prevState = state.rowState || {}
          //     prevState[action.data.id] = action.data.value
          //     return {...state, rowState: prevState}
          //   default:
          //     return state
          // }
    case types.TABLE_TEXT_CHANGE:
      break

    default:
      return state
  }
}
