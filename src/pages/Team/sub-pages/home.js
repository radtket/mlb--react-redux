import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { fetchNewsTeams, fetchTeamRssNews } from "../../../modules/actions";

// Components
import TeamRecentGames from "../../../components/Team/TeamRecentGames";
import TeamStandings from "../../../components/Team/TeamStandings";
import TeamRssFeed from "../../../components/Team/TeamRssFeed";
import NewsArticle from "../../../components/NewsArticle";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";

const PageTeamHome = ({ activeTeamObj, recentGames, standings }) => {
  const dispatch = useDispatch();

  const {
    newsTeamsData,
    newsTeamsLoading,
    newsTeamsError,
    teamRssNewsData,
    teamRssNewsLoading,
    teamRssNewsError,
  } = useSelector(state => {
    return {
      ...state.teamRssNews,
      ...state.newsTeams,
    };
  });

  useEffect(() => {
    const getTeamData = ({ Key }) => {
      dispatch(fetchNewsTeams(Key));
      dispatch(fetchTeamRssNews(Key));
    };

    getTeamData(activeTeamObj);
  }, [activeTeamObj, dispatch]);

  if (newsTeamsError) {
    return <ErrorMessage error={newsTeamsError} />;
  }

  if (teamRssNewsError) {
    return <ErrorMessage error={teamRssNewsError} />;
  }

  if (newsTeamsLoading || teamRssNewsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          {newsTeamsData.length ? (
            newsTeamsData.map(
              ({
                url,
                title,
                urlToImage,
                publishedAt,
                author,
                description,
                source,
              }) => {
                return (
                  <NewsArticle
                    key={url}
                    Author={author}
                    Categories={activeTeamObj.Name}
                    Content={description}
                    DatePublished={publishedAt}
                    FeaturedImage={urlToImage !== "" ? urlToImage : null}
                    PrimaryColor={activeTeamObj.PrimaryColor}
                    Source={source.name}
                    Team={activeTeamObj.Key}
                    Title={title}
                    Url={url}
                    WikipediaWordMarkUrl={activeTeamObj.WikipediaWordMarkUrl}
                  />
                );
              }
            )
          ) : (
            <h1>No News</h1>
          )}
        </div>
        <div className="col-sm-4">
          <TeamStandings activeTeamObj={activeTeamObj} standings={standings} />
          <TeamRecentGames
            activeTeam={activeTeamObj.Key}
            recentGames={recentGames}
          />
          <TeamRssFeed teamRssNews={teamRssNewsData} />
        </div>
      </div>
    </div>
  );
};

PageTeamHome.propTypes = {
  activeTeamObj: PropTypes.shape({
    Name: PropTypes.string,
    City: PropTypes.string,
    Key: PropTypes.string,
    PrimaryColor: PropTypes.string,
    WikipediaWordMarkUrl: PropTypes.string,
  }).isRequired,
  recentGames: PropTypes.arrayOf(PropTypes.object).isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PageTeamHome;
