import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPlayerNews } from "../../modules/playerNews/actions";
import NewsArticle from "../NewsArticle";

const PlayerNews = ({
  playerNewsFail,
  playerNewsLoading,
  playerNews,
  MLBAMID,
  playerArg,
  fetchPlayerNews: getPlayerNews,
}) => {
  useEffect(() => {
    getPlayerNews(playerArg);
  }, []);

  if (playerNewsFail) {
    return <div>Error! {playerNewsFail.message}</div>;
  }

  if (playerNewsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {playerNews.length ? (
        playerNews.map(article => {
          const { NewsID } = article;
          return <NewsArticle key={NewsID} MLBAMID={MLBAMID} {...article} />;
        })
      ) : (
        <h1>No News</h1>
      )}
    </>
  );
};

PlayerNews.propTypes = {
  playerArg: PropTypes.string,
  MLBAMID: PropTypes.number,
  playerNewsFail: null || PropTypes.bool,
  playerNewsLoading: PropTypes.bool.isRequired,
  playerNews: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchPlayerNews: PropTypes.func.isRequired,
};

PlayerNews.defaultProps = {
  playerNewsFail: null,
  playerArg: null,
  MLBAMID: null,
};

const mapStateToProps = ({ playerNews }) => ({
  playerNews: playerNews.playerNewsData,
  playerNewsLoading: playerNews.playerNewsLoading,
  playerNewsFail: playerNews.playerNewsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPlayerNews,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(PlayerNews);
