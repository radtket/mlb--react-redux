import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import { fetchNewsTeams, fetchTeamRssNews } from "../../../modules/actions";

// Components
import TeamRecentGames from "../../../components/Team/TeamRecentGames";
import TeamStandings from "../../../components/Team/TeamStandings";
import TeamRssFeed from "../../../components/Team/TeamRssFeed";
import NewsArticle from "../../../components/NewsArticle";
import LoadingSpinner from "../../../components/LoadingSpinner";

const PageTeamHome = ({
  // Passed
  activeTeamObj,
  recentGames,
  standings,

  // Redux
  fetchNewsTeams: getNewsTeams,
  fetchTeamRssNews: getTeamRssNews,
  newsTeams,
  newsTeamsFail,
  newsTeamsLoading,
  teamRssNews,
  teamRssNewsFail,
  teamRssNewsLoading,
}) => {
  useEffect(() => {
    const getTeamData = ({ Key }) => {
      getNewsTeams(Key);
      getTeamRssNews(Key);
    };

    getTeamData(activeTeamObj);
  }, [activeTeamObj]);

  if (newsTeamsFail) {
    return <div>Error! {newsTeamsFail.message}</div>;
  }

  if (teamRssNewsFail) {
    return <div>Error! {teamRssNewsFail.message}</div>;
  }

  if (newsTeamsLoading || teamRssNewsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          {newsTeams.length ? (
            newsTeams.map(
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
          <TeamRssFeed teamRssNews={teamRssNews} />
        </div>
      </div>
    </div>
  );
};

PageTeamHome.propTypes = {
  // Passed Down
  activeTeamObj: PropTypes.shape({
    Name: PropTypes.string,
    City: PropTypes.string,
    Key: PropTypes.string,
    PrimaryColor: PropTypes.string,
  }).isRequired,
  recentGames: PropTypes.arrayOf(PropTypes.object).isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,

  // Redux
  fetchNewsTeams: PropTypes.func.isRequired,
  fetchTeamRssNews: PropTypes.func.isRequired,
  newsTeams: PropTypes.arrayOf(PropTypes.object).isRequired,
  newsTeamsFail: null || PropTypes.bool,
  newsTeamsLoading: PropTypes.bool.isRequired,
  teamRssNews: PropTypes.arrayOf(PropTypes.object).isRequired,
  teamRssNewsFail: null || PropTypes.bool,
  teamRssNewsLoading: PropTypes.bool.isRequired,
};

PageTeamHome.defaultProps = {
  newsTeamsFail: null,
  teamRssNewsFail: null,
};

const mapStateToProps = ({ newsTeams, teamRssNews }) => ({
  newsTeams: newsTeams.newsTeamsData,
  newsTeamsLoading: newsTeams.newsTeamsLoading,
  newsTeamsFail: newsTeams.newsTeamsError,
  teamRssNews: teamRssNews.teamRssNewsData,
  teamRssNewsLoading: teamRssNews.teamRssNewsLoading,
  teamRssNewsFail: teamRssNews.teamRssNewsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchNewsTeams,
      fetchTeamRssNews,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(PageTeamHome);
