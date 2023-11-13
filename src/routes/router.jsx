import { createBrowserRouter } from 'react-router-dom'

import Root from './Root/Root'
import ErrorPage from './ErrorPage/ErrorPage'
import Home from './Home/Home'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'

import CreateSecretSanta from './CreateSecretSanta/CreateSecretSanta'
import SecretSanta from './SecretSanta/SecretSanta'
import ForgottenPassword from './ForgottenPassword/ForgottenPassword'
import Summary from './Summary/Summary'


import PrivateRoute from './PrivateRoute/PrivateRoute'
import Quizz from './Quizz/Quizz'
import GiftIdeas from './GiftIdeas/GiftIdeas'
import Profil from './Profil/Profil'


const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/SignIn',
        element: <SignIn />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/SignUp',
        element: <SignUp />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/ForgottenPassword',
        element: <ForgottenPassword/>,
        errorElement: <ErrorPage />,
      },
      {
        path: 'Summary',
        element: <Summary/>,
        errorElement: <ErrorPage />,
      },
      {
        path: 'Quizz',
        element: <Quizz />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/GiftIdeas',
        element: <GiftIdeas />,  
        errorElement: <ErrorPage />,
      },
      {
        path: 'YourSecretSanta',
        element: <GiftIdeas />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'Profil',
        element:  <PrivateRoute><Profil /> </PrivateRoute>,
        errorElement: <ErrorPage />,
      },
      {
        path: 'CreateSecretSanta',
        element:
          <PrivateRoute>
            <CreateSecretSanta />
          </PrivateRoute>,
      },
      {
        path: 'CreateSecretSanta/:id',
        element:
          <PrivateRoute>
            <SecretSanta />
          </PrivateRoute>,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
