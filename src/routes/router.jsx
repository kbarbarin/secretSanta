import { createBrowserRouter } from 'react-router-dom'

import Root from './Root/Root'
import ErrorPage from './ErrorPage/ErrorPage'
import Home from './Home/Home'

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/Home',
        element: <Home />,
        errorElement: <ErrorPage />,
      }
    ]
  },
]

export const router = createBrowserRouter(routes)
