import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
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
      {team1 && <img alt={`${team1} Logo`} src={espnLogo(team1, 50)} />}
      {team2 && <img alt={`${team2} Logo`} src={espnLogo(team2, 50)} />}
      {!team1 && !team2 && (
        <img
          alt="MLB Logo"
          src={`${process.env.PUBLIC_URL}/images/mlb-logo.png`}
        />
      )}
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
      className={classnames("news-card", {
        [`news-card--${cardSize}`]: cardSize,
      })}
    >
      <a href={Url} rel="noopener noreferrer" target="_blank">
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
          }
        >
          <figcaption className="news-card__label">{Categories}</figcaption>
        </figure>
      </a>
      <div className="news-card__inner">
        <a
          className="news-card__cta"
          href={Url}
          style={{
            backgroundImage: `url("${
              Team
                ? espnLogo(Team, 50)
                : `${process.env.PUBLIC_URL}/images/mlb-logo.png`
            }")`,
          }}
        >
          <span className="sr-only">{`${Team || "MLB"} Logo`}</span>
        </a>
        <time
          className="news-card__date"
          dateTime={
            format(new Date(Updated), "YYYY-MM-DD HH:mm") ||
            format(new Date(DatePublished), "YYYY-MM-DD HH:mm")
          }
        >
          {TimeAgo || format(new Date(DatePublished), "MMMM Do, YYYY")}
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
              alt={Author}
              src={
                RotoBallerReporters[Author]
                  ? RotoBallerReporters[Author].Avatar
                  : DefualtAvatar
              }
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
