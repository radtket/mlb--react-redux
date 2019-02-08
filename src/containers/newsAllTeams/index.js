import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchNewsAllTeams } from "../../modules/newsAllTeams/actions";

class NewsAllTeamsList extends Component {
  componentDidMount() {
    this.props.fetchNewsAllTeams();
  }

  render() {
    const { error, loading, newsAllTeams } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        <li>hi</li>
        {newsAllTeams.map(article => (
          <li key={article.NewsID}>{article.Title}</li>
        ))}
      </ul>
    );
  }
}

NewsAllTeamsList.propTypes = {
  error: null || PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  newsAllTeams: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchNewsAllTeams: PropTypes.func.isRequired
};

NewsAllTeamsList.defaultProps = {
  error: null
};

const mapStateToProps = state => ({
  newsAllTeams: state.newsAllTeams.newsAllTeamsData,
  loading: state.newsAllTeams.loading,
  error: state.newsAllTeams.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchNewsAllTeams
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(NewsAllTeamsList);
