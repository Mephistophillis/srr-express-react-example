import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setHello } from '../store/actions'

import { fetchTodos } from '../store/actions'

const Todo = ({ fetchTodos, todos }) => {
  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div>
      <h1>Todo</h1>
      <br />
      <Link to={'/'}>Home</Link>
      <br />
      {todos.map(todo => {
        return (
          <React.Fragment>
            <Item key={todo.id}>
              {todo.id} {todo.title}
            </Item>
            <br />
          </React.Fragment>
        )
      })}
    </div>
  )
}

const Item = styled.span`
  color: tomato;
  width: 100vw;
`

const loadData = (store, param) => {
  return store.dispatch(fetchTodos(param))
}

const mapStateToProps = state => ({
  todos: state.todos,
})

const mapDispatchToProps = {
  fetchTodos,
}

export default {
  component: connect(
    mapStateToProps,
    mapDispatchToProps
  )(Todo),
  loadData,
}
