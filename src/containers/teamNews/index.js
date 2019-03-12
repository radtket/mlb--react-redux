import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTeamNews } from "../../modules/teamNews/actions";

class TeamNewsList extends Component {
  componentDidMount() {
    const { fetchTeamNews: getTeamNews } = this.props;
    getTeamNews("CHC");
  }

  render() {
    const { teamNewsFail, teamNewsLoading, teamNews } = this.props;

    if (teamNewsFail) {
      return <div>Error! {teamNewsFail.message}</div>;
    }

    if (teamNewsLoading) {
      return <div>Loading...</div>;
    }

    console.log(teamNews);

    return (
      <div>
        <h1>hi</h1>
      </div>
      // <ul>
      //   {teamNews &&
      //     teamNews.map(item => <li key={item.Key}>{item.Name}</li>)}
      // </ul>
    );
  }
}

TeamNewsList.propTypes = {
  teamNewsFail: null || PropTypes.bool,
  teamNewsLoading: PropTypes.bool.isRequired,
  teamNews: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTeamNews: PropTypes.func.isRequired,
};

TeamNewsList.defaultProps = {
  teamNewsFail: null,
};

const mapStateToProps = ({ teamNews }) => ({
  teamNews: teamNews.teamNewsData,
  teamNewsLoading: teamNews.teamNewsLoading,
  teamNewsFail: teamNews.teamNewsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTeamNews,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(TeamNewsList);
