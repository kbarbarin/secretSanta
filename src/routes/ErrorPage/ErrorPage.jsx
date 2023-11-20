import { useNavigate, useRouteError } from 'react-router-dom'

import Button from '../../components/Button/Button'

import './ErrorPage.scss'

export default function ErrorPage() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }
  const error = useRouteError()
  console.error(error)

  return (
    <div id="errorPage">
      <img src="/assets/404Logo.png" alt="Error 404" />
      <img
        className="santaError"
        src="/assets/santaError.png"
        alt="Error Sad Santa"
      />
      <Button className="btnGoHome" onClick={handleGoHome}>
        RETURN HO-HO-HOME
      </Button>
    </div>
  )
}
