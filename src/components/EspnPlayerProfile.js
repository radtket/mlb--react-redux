import React from "react";
import PropTypes from "prop-types";
import { espnLogo, teamFinder } from "../utils/helpers";

const EspnPlayerProfile = ({
  PhotoUrl,
  Position,
  Team,
  InjuryStatus,
  Jersey,
  FirstName,
  LastName,
}) => {
  const TeamObject = Team && teamFinder[Team];
  return (
    <div className="espn-player-header">
      <div className="espn-player-team-container">
        <figure className="espn-player-team-logo">
          <div className="aspect-ratio--1x1">
            <img
              alt=""
              className="aspect-ratio--object"
              src={Team && espnLogo(Team, 150)}
            />
          </div>
        </figure>
        <figure className="espn-player-headshot">
          <img alt="" src={PhotoUrl} />
        </figure>
      </div>
      <div className="espn-player-header-gradient" />
      <div className="espn-player-info">
        <div className="espn-player-jersey">{Jersey}</div>

        <div className="espn-player-container">
          <div className="espn-player-name">
            <div>{FirstName}</div>
            <div>{LastName}</div>
          </div>
          <span className="espn-player-teamname">
            {TeamObject && `${TeamObject.City} ${TeamObject.Name}`}
          </span>
          <div className="stat-table">
            <div className="stat">
              <div className="stat-label">ELIG</div>
              <div className="stat-value">{Position}</div>
            </div>
            <div className="stat">
              <div className="stat-label">OWNER</div>
              <div className="stat-value">
                <div className="flex items-center team--link">
                  <span className="teamAbbrev">CYA</span>
                </div>
              </div>
            </div>
            <div className="stat">
              <div className="stat-label">STATUS</div>
              <div className="stat-value">
                <span className="espn-player-status espn-player-status--healthy">
                  {InjuryStatus}
                  <span className="espn-player-status-circle" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EspnPlayerProfile.propTypes = {
  PhotoUrl: PropTypes.string.isRequired,
  Position: PropTypes.string.isRequired,
  Team: PropTypes.string.isRequired,
  InjuryStatus: PropTypes.string.isRequired,
  Jersey: PropTypes.string.isRequired,
  FirstName: PropTypes.string.isRequired,
  LastName: PropTypes.string.isRequired,
};

export default EspnPlayerProfile;
