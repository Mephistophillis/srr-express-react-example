import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import Todo from './pages/Todos'
import NotFound from './pages/NotFound'

export default [
  {
    component: App,
    routes: [
      {
        ...Home,
        path: '/',
        exact: true,
      },
      {
        ...About,
        path: '/about',
      },
      {
        ...Todo,
        path: '/todos',
      },
      {
        ...NotFound,
      },
    ],
  },
]
