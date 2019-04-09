import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const FoxSportsBio = styled.section`
  color: ${props => props.TeamColorPrimary || "#c71414"};

  .bio__branding,
  .bio__branding--stripe-offset {
    background-color: ${props => props.TeamColorPrimary || "#c71414"};
  }

  .bio__branding--stripe {
    background-color: ${props => props.TeamColorSecondary || "#e68217"};
  }

  .bio__branding--stripe-offset__top {
    background: linear-gradient(
      to bottom,
      ${props => props.TeamColorPrimary || "#c71414"} 0,
      ${props => props.TeamColorPrimary || "#c71414"} 3px,
      ${props => props.TeamColorSecondary || "#e68217"} 3px,
      ${props => props.TeamColorSecondary || "#e68217"} 5px,
      ${props => props.TeamColorPrimary || "#c71414"} 5px
    );
  }
`;

const FoxSports = ({
  FullName,
  PlayerHeadshot,
  TeamColorPrimary,
  TeamColorSecondary,
  TeamLogo,
  TeamName,
}) => {
  return (
    <FoxSportsBio
      className="bio"
      TeamColorPrimary={TeamColorPrimary}
      TeamColorSecondary={TeamColorSecondary}>
      <div className="bio__branding">
        <div className="bio__branding--team-branding">
          <div className="bio__branding--team">
            <div className="bio__branding--stripe" />
            <div className="bio__branding--stripe-offset" />
            <img src={TeamLogo} alt={TeamName} />
            <div className="bio__branding--stripe-offset__top" />
          </div>
        </div>
      </div>
      <figure className="bio__headshot">
        <img src={PlayerHeadshot} alt={FullName} />
      </figure>

      <article className="bio__info">
        <h2 className="bio__info--name">{FullName}</h2>
      </article>
    </FoxSportsBio>
  );
};

FoxSports.propTypes = {
  FullName: PropTypes.string,
  PlayerHeadshot: PropTypes.string,
  TeamColorPrimary: PropTypes.string,
  TeamColorSecondary: PropTypes.string,
  TeamLogo: PropTypes.string,
  TeamName: PropTypes.string,
};

FoxSports.defaultProps = {
  FullName: "Mehdi Abdesmad",
  PlayerHeadshot:
    "https://b.fssta.com/uploads/application/nfl/headshots/12920.vresize.350.425.medium.68.png",
  TeamColorPrimary: "#c71414",
  TeamColorSecondary: "#e68217",
  TeamLogo:
    "https://b.fssta.com/uploads/content/dam/fsdigital/fscom/global/dev/static_resources/nfl/teams/retina/27.vresize.184.184.medium.0.png",
  TeamName: "Tampa Bay Buccaneers",
};

export default FoxSports;
