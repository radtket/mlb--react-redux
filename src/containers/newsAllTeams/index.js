import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchNewsAllTeams } from "../../modules/newsAllTeams/actions";
import NewsArticle from "./NewsArticle";

class NewsAllTeamsList extends Component {
  constructor(props) {
    super();
    props.fetchNewsAllTeams();
  }

  render() {
    const { newsAllError, newsAllLoading, newsAllTeams } = this.props;

    if (newsAllError) {
      return <div>Error! {newsAllError.message}</div>;
    }

    if (newsAllLoading) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        {newsAllTeams &&
          newsAllTeams.map(article => {
            const { NewsID } = article;
            return <NewsArticle key={NewsID} {...article} />;
          })}
      </ul>
    );
  }
}

NewsAllTeamsList.propTypes = {
  newsAllError: null || PropTypes.bool,
  newsAllLoading: PropTypes.bool.isRequired,
  newsAllTeams: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchNewsAllTeams: PropTypes.func.isRequired,
};

NewsAllTeamsList.defaultProps = {
  newsAllError: null,
};

const mapStateToProps = ({ newsAllTeams }) => ({
  newsAllTeams: newsAllTeams.newsAllTeamsData,
  newsAllLoading: newsAllTeams.newsAllLoading,
  newsAllError: newsAllTeams.newsAllError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchNewsAllTeams,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(NewsAllTeamsList);
