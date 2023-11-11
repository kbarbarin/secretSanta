import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import './Home.scss'

import Button from '../../components/Button/Button'
import Collapse from '../../components/Collapse/Collapse'

import { aboutList } from '../../datas/faq'

export default function Home() {
  const navigate = useNavigate()

  const handleSecretSantaCreation = () => {
    console.log('coucou')
    navigate('/CreateSecretSanta')
  }

  return (
    <div>
      <Outlet />
      <div className="home">
        <img src="assets/logo.png" alt="secret santa's logo" />
        <h1 className="home__title">Ho-Ho! </h1>
        <h1 className="home__title--yellow">It's Secret Santa Time!</h1>
        <div className="home__buttons">
          <Button
            className="button__color--primary"
            onClick={handleSecretSantaCreation}
          >
            Create my Secret Santa
          </Button>
          <Button className="button__color--secondary">
            Join a Secret Santa
          </Button>
        </div>
      </div>
      <div className="home__treeFooter"></div>
      <div className="info">
        <div className="info__container">
          <h2>
            <span className="info__title--white">What's a </span>
            <span className="info__title--red">Secret Santa?</span>
          </h2>
          <div className="info__paragraph">
            <p>
              Secret Santa is a festive Christmas custom where individuals
              within a group or community receive the task of anonymously
              gifting someone, with the giver's identity remaining concealed
              until the gift exchange
            </p>
            <p>
              The world record for the largest Secret Santa gift exchange was
              set on December 11, 2010, when 1,764 participants came together to
              exchange gifts in an event organized by Reddit's online community.
            </p>
          </div>
        </div>
        <img
          src="/assets/gifts.png"
          alt="gifts illustrations"
          className="giftImg"
        />
        <div className="info__container">
          <h2>
            <span className="info__title--white">How does it </span>
            <span className="info__title--red">works?</span>
          </h2>
          <div className="info__paragraph">
            <p>
              Experience the magic of Secret Santa with our user-friendly
              platform! Simply create a gift exchange by adding participant
              names and emails, or effortlessly join one using a received link
              or password.
            </p>
            <p>
              Dive into the festive spirit by answering a few fun questions, and
              unveil the perfect gift recipient. Our site makes spreading
              holiday cheer as easy as clicking a button, ensuring everyone gets
              a surprise that brings a smile!
            </p>
          </div>
        </div>
      </div>
      <div className="faq">
        <h2 className="info__title--yellow">FAQ</h2>
        {aboutList.map((el, index) => (
          <Collapse key={index} label={el.label} text={el.text} />
        ))}
      </div>
    </div>
  )
}
