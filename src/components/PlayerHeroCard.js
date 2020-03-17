import React from "react";
import styled from "styled-components";
import tinycolor from "tinycolor2";
import PropTypes from "prop-types";

import {
  espnLogo,
  birthday,
  inchesToFeet,
  PositionsBaseball,
  UsaTodayHeadshotNoBackgroundImage,
} from "../utils/helpers";
import LoadingSpinner from "./LoadingSpinner";

const PlayerHeroCardWrap = styled.div`
&.player-hero-card {
  .hero {
    &::after {
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(33, 33, 32, 50%) 75%, rgba(33, 33, 32, 75%) 100%);
  }

    &::before {
    background: ${({ MLBAMID }) =>
      `url('https://securea.mlb.com/images/players/action_shots/${`${MLBAMID}`}.jpg')`};
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }

  .cover {
    &::after {
    background:
      url('${({ TeamLogo }) => `${TeamLogo}`}');
      z-index: 0;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }


  .hero--jersey {
    background: ${({ PrimaryColor }) => `${PrimaryColor}`};
    border: 3px solid ${({ SecondaryColor }) => `${SecondaryColor}`};
    color: ${({ PrimaryColor, SecondaryColor }) =>
      `${tinycolor
        .mostReadable(`${PrimaryColor}`, [`${SecondaryColor}`, "#fff", "#000"])
        .toHexString()}`};
  }

  .details .title2 {
    color: ${({ PrimaryColor, SecondaryColor }) =>
      `${tinycolor
        .mostReadable(`#212120bf`, [
          `${PrimaryColor}`,
          `${SecondaryColor}`,
          "#ccc",
        ])
        .toHexString()}`};
  }
}
`;

const PlayerHeroCard = ({
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
  Position,
  PrimaryColor,
  SecondaryColor,
  Team,
  UsaTodayHeadshotNoBackgroundUrl,
  Weight,
  // PhotoUrl,
}) => {
  if (!MLBAMID) {
    return <LoadingSpinner />;
  }
  return (
    <PlayerHeroCardWrap
      className="player-hero-card"
      MLBAMID={MLBAMID}
      PrimaryColor={PrimaryColor}
      SecondaryColor={SecondaryColor}
      TeamLogo={espnLogo(Team, 200)}
      UsaTodayHeadshotNoBackgroundUrl={UsaTodayHeadshotNoBackgroundUrl}
    >
      <div className="container">
        <figure className="cover">
          <img
            alt={`${FirstName} ${LastName}`}
            src={UsaTodayHeadshotNoBackgroundImage(
              UsaTodayHeadshotNoBackgroundUrl,
              200
            )}
          />
        </figure>
        <div className="hero">
          <div className="hero--jersey">{Jersey}</div>
          <div className="details">
            <div className="title1">{`${FirstName} ${LastName}`}</div>
            <div className="title2">
              {Position && PositionsBaseball[Position]}
            </div>
          </div>
        </div>
        <div className="description">
          <div className="column1">
            <dl>
              <dt>Height</dt>
              <dd>{inchesToFeet(Height)}</dd>
              <dt>Weight</dt>
              <dd>{Weight} lbs</dd>
              <dt>Age</dt>
              <dd>{BirthDate && birthday(BirthDate)}</dd>
              <dt>Born</dt>
              <dd>
                {BirthCity && `${BirthCity}, `}
                {BirthState && `${BirthState}, `}
                {BirthCountry && BirthCountry}
              </dd>
              {College && <dt>College</dt>}
              {College && <dd>{College}</dd>}
            </dl>
          </div>
          <div className="column2">
            <p>
              The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested. Sections 1.10.32 and
              1.10.33 from de Finibus Bonorum et Malorum by Cicero are also
              reproduced in their exact original form, accompanied by English
              versions from the 1914 translation by H. Rackham.
            </p>
          </div>
        </div>
      </div>
    </PlayerHeroCardWrap>
  );
};

PlayerHeroCard.propTypes = {
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
  Position: PropTypes.string,
  PrimaryColor: PropTypes.string,
  SecondaryColor: PropTypes.string,
  Team: PropTypes.string,
  UsaTodayHeadshotNoBackgroundUrl: PropTypes.string,
  Weight: PropTypes.number,
  // PhotoUrl: PropTypes.string,
};

PlayerHeroCard.defaultProps = {
  BirthCity: null,
  BirthCountry: null,
  BirthDate: null,
  BirthState: null,
  College: null,
  FirstName: "",
  Height: null,
  Jersey: null,
  LastName: "",
  MLBAMID: null,
  Position: "",
  PrimaryColor: null,
  SecondaryColor: null,
  Team: "",
  UsaTodayHeadshotNoBackgroundUrl: null,
  Weight: null,
  // PhotoUrl: null,
};

export default PlayerHeroCard;
