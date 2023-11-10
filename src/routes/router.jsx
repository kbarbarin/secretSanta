import { createBrowserRouter } from 'react-router-dom';

import Root from './Root/Root'
import ErrorPage from './ErrorPage/ErrorPage';
import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import QuestionPage from './QuestionPage/QuestionPage';

import CreateSecretSanta from './CreateSecretSanta/CreateSecretSanta';
import SecretSanta from './SecretSanta/SecretSanta';

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
        path: '/QuestionPage',
        element: <QuestionPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'CreateSecretSanta',
        element: <CreateSecretSanta />,
      },
      {
        path: 'CreateSecretSanta/:id',
        element: <SecretSanta />,
      },
    ],
  }
]

export const router = createBrowserRouter(routes)
