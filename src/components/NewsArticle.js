import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  espnLogo,
  getExcerpt,
  RotoBallerReporters,
  DefualtAvatar,
} from "../utils/helpers";

export const SplitLogo = (team1, team2) => {
  return (
    <figure className="split-logo">
      {team1 && <img src={espnLogo(team1, 50)} alt={`${team1} Logo`} />}
      {team2 && <img src={espnLogo(team2, 50)} alt={`${team2} Logo`} />}
      {!team1 && !team2 && <img src="/images/mlb-logo.png" alt="MLB Logo" />}
    </figure>
  );
};

const NewsArticle = ({
  Author,
  cardSize,
  Categories,
  Content,
  DatePublished,
  FeaturedImage,
  MLBAMID,
  PrimaryColor,
  Source,
  Team,
  Team2,
  TimeAgo,
  Title,
  Updated,
  Url,
  WikipediaWordMarkUrl,
  // PlayerID,
  // PlayerID2,
}) => {
  return (
    <article
      className={`news-card ${cardSize ? `news-card--${cardSize}` : ""}`}>
      <a href={Url} target="_blank" rel="noopener noreferrer">
        <figure
          className="news-card__image"
          style={
            (FeaturedImage && {
              backgroundImage: `url(${FeaturedImage})`,
            }) ||
            (WikipediaWordMarkUrl &&
              PrimaryColor && {
                background: `#${PrimaryColor}`,
                backgroundImage: `url(${WikipediaWordMarkUrl})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }) ||
            (MLBAMID && {
              backgroundImage: `url('https://securea.mlb.com/images/players/action_shots/${MLBAMID}.jpg')`,
            })
          }>
          <figcaption className="news-card__label">{Categories}</figcaption>
        </figure>
      </a>
      <div className="news-card__inner">
        <a
          href={Url}
          className="news-card__cta"
          style={{
            backgroundImage: `url("${
              Team ? espnLogo(Team, 50) : "/images/mlb-logo.png"
            }")`,
          }}>
          <span className="sr-only">{`${Team || "MLB"} Logo`}</span>
        </a>
        <time
          dateTime={
            format(new Date(Updated), "YYYY-MM-DD HH:mm") ||
            format(new Date(DatePublished), "YYYY-MM-DD HH:mm")
          }
          className="news-card__date">
          {TimeAgo || format(new Date(DatePublished), "YYYY-MM-DD")}
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
              src={
                RotoBallerReporters[Author]
                  ? RotoBallerReporters[Author].Avatar
                  : DefualtAvatar
              }
              alt={Author}
            />
          </figure>
          <div className="post-author__info">
            <h4 className="post-author__name">{Author || Source}</h4>
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

NewsArticle.propTypes = {
  Author: PropTypes.string,
  cardSize: PropTypes.string,
  Categories: PropTypes.string,
  Content: PropTypes.string.isRequired,
  DatePublished: PropTypes.string,
  FeaturedImage: PropTypes.string,
  MLBAMID: PropTypes.number,
  PrimaryColor: PropTypes.string,
  Source: PropTypes.string,
  Team: PropTypes.string,
  Team2: PropTypes.string,
  TimeAgo: PropTypes.string,
  Title: PropTypes.string.isRequired,
  Updated: PropTypes.string,
  Url: PropTypes.string.isRequired,
  WikipediaWordMarkUrl: PropTypes.string,
  // PlayerID: PropTypes.number,
  // PlayerID2: PropTypes.number,
};

NewsArticle.defaultProps = {
  Author: null,
  cardSize: null,
  Categories: "News",
  DatePublished: null,
  FeaturedImage: null,
  MLBAMID: null,
  PrimaryColor: null,
  Source: null,
  Team: null,
  Team2: null,
  TimeAgo: null,
  Updated: null,
  WikipediaWordMarkUrl: null,
  // PlayerID: null,
  // PlayerID2: null,
};

export default NewsArticle;
