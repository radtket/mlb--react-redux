import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "../Card";

class TeamRssFeed extends Component {
  renderRssHeadlines = teamRssNews => {
    return teamRssNews.map(article => {
      const { title, link } = article;
      const { id, teamcode } = article["mlb:team"][0].$;

      return (
        <li key={`${teamcode} ${link} ${id}`}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </li>
      );
    });
  };

  render() {
    const { teamRssNews } = this.props;
    return (
      <Card
        title="RSS Feed"
        body={
          <ul className="list--nav" style={{ marginBottom: 0 }}>
            {teamRssNews && this.renderRssHeadlines(teamRssNews)}
          </ul>
        }
      />
    );
  }
}

TeamRssFeed.propTypes = {
  teamRssNews: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.arrayOf(PropTypes.string),
      link: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default TeamRssFeed;
