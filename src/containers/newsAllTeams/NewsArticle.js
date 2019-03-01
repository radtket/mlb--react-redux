import React from "react";
import PropTypes from "prop-types";
import { espnLogo, getExcerpt } from "../../utils/helpers";

const NewsArticle = ({
  Title,
  Url,
  Categories,
  Content,
  TimeAgo,
  PlayerID,
  PlayerID2,
  Author,
  Team,
}) => {
  return (
    <article className="news-card">
      <a href={Url} target="_blank" rel="noopener noreferrer">
        <figure className="news-card__image">
          <figcaption className="news-card__label">{Categories}</figcaption>
        </figure>
      </a>
      <div className="news-card__inner">
        <a
          href={Url}
          className="news-card__cta"
          style={{
            backgroundImage: `url(${
              Team
                ? espnLogo(Team, 48)
                : "http://content.sportslogos.net/logos/4/490/full/1986.gif"
            })`,
          }}
        />
        <time dateTime="2016-08-23" className="news-card__date">
          {TimeAgo}
        </time>
        <h1 className="news-card__headline">{Title}</h1>
        <div className="news-card__body">
          <p>{getExcerpt(Content, 200).shortText}</p>
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
            <h4 className="post-author__name">{Author}</h4>
          </div>
        </div>

        <ul className="news-card__meta">
          <li className="news-card__meta-item news-card__meta-item--views">
            2369
          </li>
          <li className="news-card__meta-item news-card__meta-item--likes">
            <a href="#">
              <i className="meta-like icon-heart" /> 530
            </a>
          </li>
          <li className="news-card__meta-item news-card__meta-item--comments">
            <a href="#">18</a>
          </li>
        </ul>
      </footer>
    </article>
  );
};

NewsArticle.propTypes = {
  Title: PropTypes.string.isRequired,
  Url: PropTypes.string.isRequired,
  Categories: PropTypes.string,
  Content: PropTypes.string.isRequired,
  TimeAgo: PropTypes.string.isRequired,
  PlayerID: PropTypes.number,
  PlayerID2: PropTypes.number,
  Author: PropTypes.string.isRequired,
  Team: PropTypes.string,
};

NewsArticle.defaultProps = {
  Categories: "News",
  PlayerID: null,
  PlayerID2: null,
  Team: null,
};

export default NewsArticle;
