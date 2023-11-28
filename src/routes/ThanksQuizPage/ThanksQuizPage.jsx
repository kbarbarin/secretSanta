import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'

import './ThanksQuizPage.scss'

export default function ThanksQuizPage() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div id="ty-quizz">
      <img className="Elf" src="/assets/elf.png" alt="Elf Quizz" />
      <h1>Thank you for taking the time to answer the quiz!</h1>
      <Button className="button__color--secondary" onClick={handleGoHome}>
        GO HOME
      </Button>
    </div>
  )
}
