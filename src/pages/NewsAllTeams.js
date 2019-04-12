import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchNewsAllTeams } from "../modules/actions";
import NewsArticle from "../components/NewsArticle";
import { findMLBID } from "../utils/helpers";

const NewsAllTeamsList = ({
  newsAllError,
  newsAllLoading,
  newsAllTeams,
  fetchNewsAllTeams: getNewsAllTeams,
}) => {
  useEffect(() => {
    getNewsAllTeams();
  }, []);

  if (newsAllError) {
    return <div>Error! {newsAllError.message}</div>;
  }

  if (newsAllLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid posts-wrap">
      {newsAllTeams &&
        newsAllTeams.map(article => {
          const { NewsID, MLBAMID, PlayerID } = article;
          return (
            <NewsArticle
              cardSize="qrt"
              key={NewsID}
              MLBAMID={MLBAMID || findMLBID(PlayerID)}
              {...article}
            />
          );
        })}
    </div>
  );
};

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
