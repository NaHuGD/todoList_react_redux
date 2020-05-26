import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(reducers)
store.subscribe(() => {
    console.log('更新subscribe', store.getState())
})
export default store