import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TeamRoster from "../../../components/Team/TeamRoster";
import { fetchTeamRoster } from "../../../modules/actions";
import LoadingSpinner from "../../../components/LoadingSpinner";

const PageTeamRoster = ({
  fetchTeamRoster: getTeamRoster,
  teamRoster,
  teamRosterError,
  teamRosterLoading,
  match: {
    params: { teamAbrv },
  },
}) => {
  useEffect(() => {
    getTeamRoster(teamAbrv);
  }, []);

  if (teamRosterError) {
    return <div>Error! {teamRosterError.message}</div>;
  }

  if (teamRosterLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <TeamRoster {...{ teamRoster, teamRosterError, teamRosterLoading }} />
        </div>
      </div>
    </div>
  );
};

PageTeamRoster.propTypes = {
  teamRosterError: PropTypes.bool,
  teamRosterLoading: PropTypes.bool.isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTeamRoster: PropTypes.func.isRequired,
};

PageTeamRoster.defaultProps = {
  teamRosterError: null,
};

const mapStateToProps = ({ teamRoster }) => ({
  ...teamRoster,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTeamRoster,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(withRouter(PageTeamRoster));
