import axios from 'axios'
import { SET_HELLO, FETCH_TODOS } from './types'

export const setHello = payload => ({
  type: SET_HELLO,
  payload,
})

export const fetchTodos = () => async dispatch => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/todos')

  dispatch({
    type: FETCH_TODOS,
    payload: res.data,
  })
}
