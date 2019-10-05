import React from "react";
import PropTypes from "prop-types";
import Card from "../Card";

const TeamRssFeed = ({ teamRssNews }) => {
  const renderRssHeadlines = rssArg => {
    return rssArg.map(article => {
      const { title, link } = article;
      const { id, teamcode } = article["mlb:team"][0].$;

      return (
        <li key={`${teamcode} ${link} ${id}`}>
          <a href={link} rel="noopener noreferrer" target="_blank">
            {title}
          </a>
        </li>
      );
    });
  };

  return (
    <Card
      body={
        <ul className="list--nav" style={{ marginBottom: 0 }}>
          {teamRssNews && renderRssHeadlines(teamRssNews)}
        </ul>
      }
      title="RSS Feed"
    />
  );
};

TeamRssFeed.propTypes = {
  teamRssNews: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.arrayOf(PropTypes.string),
      link: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default TeamRssFeed;
