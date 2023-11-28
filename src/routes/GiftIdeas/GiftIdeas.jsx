import React from 'react'
import './GeaftIdeas.scss'

const GeaftIdeas = ({ priceRange, recommandations }) => {
  return (
    <div className="recommendations">
      <div>
        <h1 className="recommendations__title">
          Ho-Ho! Leo has been a good girl this year, send this sweetie a
          present!
        </h1>
        <div className="price-and-logo">
          <img src="/assets/logo.png" alt="Ho-Ho!'s logo" />
          <p className="recommendation-price-range">
            The limit price is {priceRange}€
          </p>
        </div>
      </div>
      <div className="recommendations__container">
        <h2 className="recommendations__titles">
          <span>No ideas ? Don't worry !</span>
          <br />
          <span>Here is a list of gifts that Léo might like:</span>
        </h2>
        <div className="recommendations-info">
          {recommandations.map((rec, index) => (
            <div key={index} className="recommendation-product">
              <div className="box-product">
                {rec.imageUrl && (
                  <img
                    src={rec.imageUrl}
                    alt={`Recommendation ${index}`}
                    className="recommendations-image"
                  />
                )}
              </div>
              <p className="recommendation-name">{rec.name}</p>
              {rec.price && (
                <p className="recommendation-price">Price: {rec.price}€</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GeaftIdeas

