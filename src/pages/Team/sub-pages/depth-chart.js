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

      return (
        <article
          className={`depth-chart__position depth-chart__position--${name.toLowerCase()}`}>
          <figure className="depth-chart__position--image">
            <img
              src={StarterObj ? StarterObj.PhotoUrl : DefualtAvatar}
              alt={`${StarterFirstName} ${StarterLastName}`}
            />
          </figure>
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
                      <Link to={`/player/${PlayerObj.PlayerID}`}>
                        {`${FirstName.charAt(0)}. ${LastName}`}
                      </Link>
                    )}
                    {!PlayerObj && `${FirstName.charAt(0)}. ${LastName}`}
                  </li>
                );
              })}
          </ul>
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
};

PageTeamDepth.defaultProps = {
  teamDepthsFail: null,
  teamRosterError: null,
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
