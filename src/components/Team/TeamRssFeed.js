import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card";
import { fetchTeamRssNews } from "../../modules/actions";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";

const TeamRssFeed = ({ activeTeam }) => {
  const dispatch = useDispatch();

  const { teamRssNewsData, teamRssNewsLoading, teamRssNewsError } = useSelector(
    state => {
      return {
        ...state.teamRssNews,
      };
    }
  );

  useEffect(() => {
    const getTeamData = team => {
      dispatch(fetchTeamRssNews(team));
    };

    getTeamData(activeTeam);
  }, [activeTeam, dispatch]);

  if (teamRssNewsError) {
    return <ErrorMessage error={teamRssNewsError} />;
  }

  if (teamRssNewsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Card
      body={
        <ul className="list--nav" style={{ marginBottom: 0 }}>
          {teamRssNewsData.map(article => {
            const { title, link } = article;
            const { id, teamcode } = article["mlb:team"][0].$;

            return (
              <li key={`${teamcode} ${link} ${id}`}>
                <a href={link} rel="noopener noreferrer" target="_blank">
                  {title}
                </a>
              </li>
            );
          })}
        </ul>
      }
      title="RSS Feed"
    />
  );
};

TeamRssFeed.propTypes = {
  activeTeam: PropTypes.string.isRequired,
};

export default TeamRssFeed;
