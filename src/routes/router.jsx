import { createBrowserRouter } from 'react-router-dom'

import Root from './Root/Root'
import ErrorPage from './ErrorPage/ErrorPage'
import Home from './Home/Home'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import TermsOfUse from './TermsOfUse/TermsOfUse'

import CreateSecretSanta from './CreateSecretSanta/CreateSecretSanta'
import SecretSanta from './SecretSanta/SecretSanta'
import ForgottenPassword from './ForgottenPassword/ForgottenPassword'
import Summary from './Summary/Summary'
import Join from './Join/Join'

import PrivateRoute from './PrivateRoute/PrivateRoute'
import Quizz from './Quizz/Quizz'
import GiftIdeas from './GiftIdeas/GiftIdeas'
import Profil from './Profil/Profil'
import EditProfile from './EditProfile/EditProfile'

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
        path: '/forgottenpassword',
        element: <ForgottenPassword />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'summary/:id/:userid',
        element: <Summary />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/join',
        element: <Join />,
      },
      {
        path: 'quizz',
        element: <Quizz />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/giftideas',
        element: <GiftIdeas />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'secretsanta',
        element: <GiftIdeas />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'create',
        element: (
          <PrivateRoute>
            <CreateSecretSanta />
          </PrivateRoute>
        ),
      },
      {
        path: 'create/:id',
        element: (
          <PrivateRoute>
            <SecretSanta />
          </PrivateRoute>
        ),
      },
      { path: '/modification', element: <EditProfile /> },
    ],
  },
  {
    path: '/signin',
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <Profil />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/termsofuse',
    element: <TermsOfUse />,
    errorElement: <ErrorPage />,
  },
]

export const router = createBrowserRouter(routes)
