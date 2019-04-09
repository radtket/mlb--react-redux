import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { fetchTeamDepths } from "../../../modules/teamDepth/actions";
import { fetchTeamRoster } from "../../../modules/teamRoster/actions";
import { DefualtAvatar } from "../../../utils/helpers";

const PageTeamDepth = ({
  fetchTeamDepths: getTeamDepths,
  fetchTeamRoster: getTeamRoster,
  teamDepthsFail,
  teamDepthsLoading,
  teamDepths,
  teamRoster,
  teamRosterError,
  teamRosterLoading,
  currentTeamAbrv,
  PrimaryColor,
  QuaternaryColor,
  SecondaryColor,
}) => {
  useEffect(() => {
    getTeamDepths(currentTeamAbrv);
    getTeamRoster(currentTeamAbrv);
  }, []);
  const { positions } = teamDepths;

  if (teamDepthsFail) {
    return <div>Error! {teamDepthsFail.message}</div>;
  }

  if (teamRosterError) {
    return <div>Error! {teamRosterError.message}</div>;
  }

  if (teamDepthsLoading || teamRosterLoading || !positions) {
    return <div>Loading...</div>;
  }

  const DepthChartPosition = ({ name, desc, players }) => {
    if (players) {
      const {
        id: StarterID,
        first_name: StarterFirstName,
        last_name: StarterLastName,
      } = players[0];

      const StarterObj = teamRoster.find(
        player => player.SportRadarPlayerID === StarterID
      );

      const bullpenElementWrapper = document.querySelector(
        ".depth-chart__position--bp"
      );
      const bullpenElement =
        bullpenElementWrapper &&
        bullpenElementWrapper.querySelector("div:first-child");

      const isCloser = name === "CL";
      const elHeight =
        bullpenElementWrapper && bullpenElementWrapper.clientHeight;
      const elWidth = bullpenElement && bullpenElement.clientWidth;

      return (
        <article
          style={
            isCloser
              ? {
                  top: `calc(82.8% + ${elHeight}px)`,
                }
              : { background: "inital" }
          }
          className={`depth-chart__position depth-chart__position--${name.toLowerCase()}`}>
          <div
            style={
              isCloser
                ? {
                    width: `${elWidth}px`,
                  }
                : { width: "auto" }
            }>
            <figure
              className="depth-chart__position--image"
              alt={`${StarterFirstName} ${StarterLastName}`}
              style={{
                background: `url("${
                  StarterObj ? StarterObj.PhotoUrl : DefualtAvatar
                }"), #${SecondaryColor ||
                  PrimaryColor ||
                  QuaternaryColor} no-repeat`,
                backgroundSize: "85%",
                backgroundPosition: "1px center",
              }}
            />
            <ul>
              <li className="depth-chart__position--header">
                {desc === "Starting Pitcher" ? "ROTATION" : desc.toUpperCase()}
              </li>

              {players &&
                players.map(activeRosterMember => {
                  const {
                    first_name: FirstName,
                    last_name: LastName,
                    id,
                  } = activeRosterMember;
                  const PlayerObj = teamRoster.find(
                    player => player.SportRadarPlayerID === id
                  );

                  return (
                    <li key={id}>
                      {PlayerObj && (
                        <Link
                          style={{ color: `#${PrimaryColor}` }}
                          to={`/player/${PlayerObj.PlayerID}`}>
                          {`${FirstName.charAt(0)}. ${LastName}`}
                        </Link>
                      )}
                      {!PlayerObj && `${FirstName.charAt(0)}. ${LastName}`}
                    </li>
                  );
                })}
            </ul>
          </div>
        </article>
      );
    }
    return false;
  };

  const TeamDepthChart = positions.map(posGroup => {
    return <DepthChartPosition key={posGroup.name} {...posGroup} />;
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1>PageTeamDepth</h1>
          <figure
            className="depth-chart"
            style={{
              backgroundImage: `url('/data/stadiums/${currentTeamAbrv}.png')`,
            }}>
            {TeamDepthChart}
          </figure>
        </div>
      </div>
    </div>
  );
};

PageTeamDepth.propTypes = {
  teamDepthsFail: null || PropTypes.bool,
  teamDepthsLoading: PropTypes.bool.isRequired,
  teamDepths: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  ).isRequired,
  fetchTeamDepths: PropTypes.func.isRequired,
  teamRosterError: null || PropTypes.bool,
  teamRosterLoading: PropTypes.bool.isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTeamRoster: PropTypes.func.isRequired,
  currentTeamAbrv: PropTypes.string.isRequired,
  PrimaryColor: PropTypes.string,
  QuaternaryColor: PropTypes.string,
  SecondaryColor: PropTypes.string,
};

PageTeamDepth.defaultProps = {
  teamDepthsFail: null,
  teamRosterError: null,
  PrimaryColor: null,
  QuaternaryColor: null,
  SecondaryColor: null,
};

const mapStateToProps = ({ teamDepths, teamRoster }) => ({
  teamDepths: teamDepths.teamDepthsData,
  teamDepthsLoading: teamDepths.teamDepthsLoading,
  teamDepthsFail: teamDepths.teamDepthsError,
  teamRoster: teamRoster.teamRosterData,
  teamRosterLoading: teamRoster.teamRosterLoading,
  teamRosterError: teamRoster.teamRosterError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTeamDepths,
      fetchTeamRoster,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(PageTeamDepth);
