import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStandings } from "../../modules/standings/standingsActions";

class StandingsList extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchStandings();
  }

  render() {
    const { error, loading, standings } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        {standings.map(team => (
          <li key={team.Key}>
            {team.Name} - {team.Percentage}
          </li>
        ))}
      </ul>
    );
  }
}

StandingsList.propTypes = {
  error: null || PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchStandings: PropTypes.func.isRequired
};

StandingsList.defaultProps = {
  error: null
};

const mapStateToProps = state => ({
  standings: state.standings.standingsData,
  loading: state.standings.loading,
  error: state.standings.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchStandings
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(StandingsList);
