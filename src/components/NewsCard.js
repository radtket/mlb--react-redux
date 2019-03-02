import React from "react";

const NewsCard = () => {
  return (
    <article className="news-card">
      <figure className="news-card__image">
        <figcaption className="news-card__label">The Team</figcaption>
      </figure>
      <div className="news-card__inner">
        <time dateTime="2016-08-23" className="news-card__date">
          August 23rd, 2018
        </time>
        <h1 className="news-card__headline">News</h1>
        <div className="news-card__body">
          <p>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </p>
        </div>
      </div>
      <footer className="news-card__footer">
        <div className="post-author">
          <figure className="post-author__avatar">
            <img
              src="http://alchemists.dan-fisher.com/basketball/assets/images/samples/avatar-1.jpg"
              alt="Post Author Avatar"
            />
          </figure>
          <div className="post-author__info">
            <h4 className="post-author__name">James Spiegel</h4>
          </div>
        </div>

        <ul className="news-card__meta">
          <li className="news-card__meta-item news-card__meta-item--views">
            2369
          </li>
          <li className="news-card__meta-item news-card__meta-item--likes">
            <i className="meta-like icon-heart" /> 530
          </li>
          <li className="news-card__meta-item news-card__meta-item--comments">
            18
          </li>
        </ul>
      </footer>
    </article>
  );
};

export default NewsCard;
