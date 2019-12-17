import React from "react";
import PropTypes from "prop-types";
import NewsArticle from "./NewsArticle";
import { findMLBID } from "../utils/helpers";

const NewsArticleGrid = ({ newsAllTeams }) => {
  return (
    <div className="container-fluid posts-wrap">
      {newsAllTeams.map(article => {
        const { NewsID, MLBAMID, PlayerID } = article;
        return (
          <NewsArticle
            key={NewsID}
            cardSize="qrt"
            MLBAMID={MLBAMID || findMLBID(PlayerID)}
            {...article}
          />
        );
      })}
    </div>
  );
};

NewsArticleGrid.propTypes = {
  newsAllTeams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewsArticleGrid;
