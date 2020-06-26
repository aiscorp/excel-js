/* This function returns own implementation of Redux
 *  Patterns:
 *  - ?Builder? => (createStore),
 *  - Observer => (Store/Redux)
 * */

export function createStore(rootReducer, initState = {}) {
  let state = rootReducer({...initState}, {type: '__INIT__'})
  let listeners = []

  return {
    subscribe(callback) {
      listeners.push(callback)
      return {
        unsubscribe() {
          listeners = listeners.filter(listener => listener !== callback)
        }
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach(listener => listener(state))
    },
    getState() {
      return JSON.parse(JSON.stringify(state))
    }
  }
}
