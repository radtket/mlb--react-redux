import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTeamDepths } from "../../modules/teamDepth/actions";

class TeamDepthList extends Component {
  componentDidMount() {
    const { fetchTeamDepths: getTeamDepths } = this.props;
    getTeamDepths();
  }

  render() {
    const { teamDepthsFail, teamDepthsLoading, teamDepths } = this.props;

    if (teamDepthsFail) {
      return <div>Error! {teamDepthsFail.message}</div>;
    }

    if (teamDepthsLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <figure className="depth-chart">
          <div className="depth-cart__lf">
            <h1>j</h1>
          </div>
        </figure>

        <ul>
          {teamDepths &&
            teamDepths.map(item => <li key={item.Key}>{item.Name}</li>)}
        </ul>
      </div>
    );
  }
}

TeamDepthList.propTypes = {
  teamDepthsFail: null || PropTypes.bool,
  teamDepthsLoading: PropTypes.bool.isRequired,
  // teamDepths: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTeamDepths: PropTypes.func.isRequired,
};

TeamDepthList.defaultProps = {
  teamDepthsFail: null,
};

const mapStateToProps = ({ teamDepths }) => ({
  teamDepths: teamDepths.teamDepthsData,
  teamDepthsLoading: teamDepths.teamDepthsLoading,
  teamDepthsFail: teamDepths.teamDepthsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTeamDepths,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(TeamDepthList);
