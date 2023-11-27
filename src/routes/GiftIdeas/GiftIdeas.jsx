import React from 'react';

const GeaftIdeas = ({ priceRange, recommandations }) => {
  return (
    <div className="recommendations">
      <div>
        <p className="title">
          Ho-Ho! Leo has been a good girl this year send this sweetie a
          present!
        </p>
        <img src="/assets/logo.png" alt="Ho-Ho!'s logo" />
        <p className="recommendation-price-range">
          The limit price is {priceRange}€
        </p>
      </div>
      <div className="container-recommendations">
        <p className="recommendations-title">Don't worry!</p>
        <p className="-title">
          Here is a list of gifts that Léo might like:
        </p>
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
  );
};

export default GeaftIdeas;
