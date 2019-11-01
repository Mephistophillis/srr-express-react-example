import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to={'/about'}>About</Link>
      <br />
      <Link to={'/todos'}>Todo</Link>
    </div>
  )
}

export default { component: Home }
