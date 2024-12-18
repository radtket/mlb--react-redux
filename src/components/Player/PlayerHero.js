import React from "react";
import PropTypes from "prop-types";
import LoadingSpinner from "../LoadingSpinner";
import {
  espnLogo,
  birthday,
  inchesToFeet,
  PositionsBaseball,
  UsaTodayHeadshotNoBackgroundImage,
} from "../../utils/helpers";

const PlayerHero = ({
  BirthCity,
  BirthCountry,
  BirthDate,
  BirthState,
  College,
  FirstName,
  Height,
  Jersey,
  LastName,
  MLBAMID,
  PhotoUrl,
  Position,
  Team,
  UsaTodayHeadshotNoBackgroundUrl,
  Weight,
}) => {
  if (!MLBAMID) {
    return <LoadingSpinner />;
  }
  return (
    <section
      className="player-heading"
      // style={{
      //   backgroundImage: `url('https://securea.mlb.com/images/players/action_shots/${MLBAMID}.jpg')`,
      // }}
    >
      <div className="container">
        <div className="player-info__team-logo">
          <img alt="" src={espnLogo(Team, 400)} />
        </div>

        <div className="player-info__title player-info__title--mobile">
          <div className="player-info__number">{Jersey}</div>
          <h1 className="player-info__name">
            <span className="player-info__first-name">{FirstName} </span>
            <span className="player-info__last-name">{LastName}</span>
          </h1>
        </div>

        <main className="player-info">
          <div className="player-info__item player-info__item--photo">
            <figure className="player-info__photo">
              <img
                alt={`${FirstName} ${LastName}`}
                onError={e => {
                  e.target.src = `${PhotoUrl}`; // some replacement image
                  e.target.style = "padding: 8px; margin: 16px"; // inline styles in html format
                }}
                src={UsaTodayHeadshotNoBackgroundImage(
                  UsaTodayHeadshotNoBackgroundUrl,
                  250
                )}
              />
              {/* <img
              src={`https://content.mlb.com/images/headshots/current/60x60/${MLBAMID}@3x.png`}
              alt=""
            />

            <img
              src={`https://content.mlb.com/images/headshots/current/60x60/${MLBAMID}@3x.png`}
              alt={`${FirstName} ${LastName}`}
              onError={e => {
                e.target.src = `${PhotoUrl}`; // some replacement image
                e.target.style = "padding: 8px; margin: 16px"; // inline styles in html format
              }}
            /> */}

              {/* <img
              src={`https://securea.mlb.com/mlb/images/players/head_shot/${MLBAMID}.jpg`}
              alt=""
            /> */}
            </figure>
          </div>

          <section className="player-info__item player-info__item--details">
            <header className="player-info__title player-info__title--desktop">
              <div className="player-info__number">{Jersey}</div>
              <h1 className="player-info__name">
                <span className="player-info__first-name">{FirstName} </span>
                <span className="player-info__last-name">{LastName}</span>
              </h1>
            </header>

            <article className="player-info-details">
              <div className="player-info-details__item player-info-details__item--height">
                <h6 className="player-info-details__title">Height</h6>
                <div className="player-info-details__value">
                  {inchesToFeet(Height)}
                </div>
              </div>
              <div className="player-info-details__item player-info-details__item--weight">
                <h6 className="player-info-details__title">Weight</h6>
                <div className="player-info-details__value">{Weight} lbs</div>
              </div>
              <div className="player-info-details__item player-info-details__item--age">
                <h6 className="player-info-details__title">Age</h6>
                <div className="player-info-details__value">
                  {BirthDate && birthday(BirthDate)}
                </div>
              </div>
              <div className="player-info-details__item player-info-details__item--college">
                <h6 className="player-info-details__title">College</h6>
                <div className="player-info-details__value">
                  {College && College}
                </div>
              </div>
              <div className="player-info-details__item player-info-details__item--born">
                <h6 className="player-info-details__title">Born</h6>
                <div className="player-info-details__value">
                  {BirthCity && `${BirthCity}, `}
                  {BirthState && `${BirthState}, `}
                  {BirthCountry && BirthCountry}
                </div>
              </div>
              <div className="player-info-details__item player-info-details__item--position">
                <h6 className="player-info-details__title">Position</h6>
                <div className="player-info-details__value">
                  {Position && PositionsBaseball[Position]}
                </div>
              </div>
            </article>
          </section>
        </main>
      </div>
    </section>
  );
};

PlayerHero.propTypes = {
  BirthCity: PropTypes.string,
  BirthCountry: PropTypes.string,
  BirthDate: PropTypes.string,
  BirthState: PropTypes.string,
  College: PropTypes.string,
  FirstName: PropTypes.string,
  Height: PropTypes.number,
  Jersey: PropTypes.number,
  LastName: PropTypes.string,
  MLBAMID: PropTypes.number,
  PhotoUrl: PropTypes.string,
  Position: PropTypes.string,
  Team: PropTypes.string,
  UsaTodayHeadshotNoBackgroundUrl: PropTypes.string,
  Weight: PropTypes.number,
  // YahooPlayerID: PropTypes.string,
};

PlayerHero.defaultProps = {
  BirthCity: null,
  BirthCountry: null,
  BirthDate: null,
  BirthState: null,
  College: null,
  Height: null,
  Jersey: null,
  MLBAMID: null,
  PhotoUrl: null,
  UsaTodayHeadshotNoBackgroundUrl: null,
  Weight: null,
  FirstName: "",
  LastName: "",
  Position: "",
  Team: "",
  // YahooPlayerID: null,
};

export default PlayerHero;
