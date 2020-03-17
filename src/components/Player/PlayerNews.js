import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlayerNews } from "../../modules/actions";
import NewsArticle from "../NewsArticle";
import LoadingSpinner from "../LoadingSpinner";
import { isArrayEmpty } from "../../utils/helpers";
import ErrorMessage from "../ErrorMessage";

const PlayerNews = ({ MLBAMID, PlayerID }) => {
  const dispatch = useDispatch();

  const { playerNewsData, playerNewsLoading, playerNewsError } = useSelector(
    state => state.playerNews
  );

  useEffect(() => {
    dispatch(fetchPlayerNews(PlayerID));
  }, [PlayerID, dispatch]);

  if (playerNewsError) {
    return <ErrorMessage error={playerNewsError} />;
  }

  if (playerNewsLoading) {
    return <LoadingSpinner />;
  }

  if (isArrayEmpty(playerNewsData)) {
    return <h1>No News</h1>;
  }

  return playerNewsData.map(article => {
    return <NewsArticle key={article.NewsID} {...{ ...article, MLBAMID }} />;
  });
};

PlayerNews.propTypes = {
  PlayerID: PropTypes.string,
  MLBAMID: PropTypes.number,
};

PlayerNews.defaultProps = {
  PlayerID: null,
  MLBAMID: null,
};

export default PlayerNews;
