import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTeamRssNews } from "../modules/teamRssNews/actions";

class TeamRssNewsList extends Component {
  componentDidMount() {
    const { fetchTeamRssNews: getTeamRssNews } = this.props;
    getTeamRssNews("CHC");
  }

  render() {
    const { teamRssNewsFail, teamRssNewsLoading, teamRssNews } = this.props;

    if (teamRssNewsFail) {
      return <div>Error! {teamRssNewsFail.message}</div>;
    }

    if (teamRssNewsLoading) {
      return <div>Loading...</div>;
    }

    console.log(teamRssNews);

    return (
      <div>
        <h1>hi</h1>
      </div>
      // <ul>
      //   {teamRssNews &&
      //     teamRssNews.map(item => <li key={item.Key}>{item.Name}</li>)}
      // </ul>
    );
  }
}

TeamRssNewsList.propTypes = {
  teamRssNewsFail: null || PropTypes.bool,
  teamRssNewsLoading: PropTypes.bool.isRequired,
  teamRssNews: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTeamRssNews: PropTypes.func.isRequired,
};

TeamRssNewsList.defaultProps = {
  teamRssNewsFail: null,
};

const mapStateToProps = ({ teamRssNews }) => ({
  teamRssNews: teamRssNews.teamRssNewsData,
  teamRssNewsLoading: teamRssNews.teamRssNewsLoading,
  teamRssNewsFail: teamRssNews.teamRssNewsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTeamRssNews,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(TeamRssNewsList);
