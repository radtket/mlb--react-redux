import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TeamRecentGames from "../components/TeamRecentGames";
import TeamStandings from "../components/TeamStandings";
import NewsArticle from "../../newsAllTeams/NewsArticle";
import { fetchNewsTeams } from "../../../modules/newsTeam/actions";

class PageTeamHome extends Component {
  componentDidMount() {
    const { match, fetchNewsTeams: getNewsTeams } = this.props;
    const { teamAbrv: currentTeamAbrv } = match.params;
    getNewsTeams(currentTeamAbrv);
  }

  componentDidUpdate(prevProps) {
    const { match, fetchNewsTeams: getNewsTeams } = this.props;
    const { teamAbrv: currentTeamAbrv } = match.params;
    const { teamAbrv: prevTeamAbrv } = prevProps.match.params;

    if (currentTeamAbrv !== prevTeamAbrv) {
      getNewsTeams(currentTeamAbrv);
    }
  }

  render() {
    const {
      activeTeamObj,
      currentTeamAbrv,
      recentGames,
      standings,
      newsTeamsFail,
      newsTeamsLoading,
      newsTeams,
    } = this.props;

    if (newsTeamsFail) {
      return <div>Error! {newsTeamsFail.message}</div>;
    }

    if (newsTeamsLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            {newsTeams.length ? (
              newsTeams.map(article => {
                const {
                  url,
                  title,
                  urlToImage,
                  publishedAt,
                  author,
                  description,
                  source,
                } = article;
                return (
                  <NewsArticle
                    key={url}
                    Title={title}
                    Url={url}
                    FeaturedImage={urlToImage !== "" ? urlToImage : null}
                    DatePublished={publishedAt}
                    Author={author}
                    Source={source.name}
                    Content={description}
                    Team={currentTeamAbrv}
                    Categories={activeTeamObj.Name}
                  />
                );
              })
            ) : (
              <h1>No News</h1>
            )}
          </div>
          <div className="col-sm-4">
            <TeamStandings
              activeTeam={currentTeamAbrv}
              activeTeamObj={activeTeamObj}
              standings={standings}
            />
            <TeamRecentGames
              activeTeam={currentTeamAbrv}
              recentGames={recentGames}
            />
          </div>
        </div>
      </div>
    );
  }
}

PageTeamHome.propTypes = {
  activeTeamObj: PropTypes.shape({
    Name: PropTypes.string,
    City: PropTypes.string,
    Key: PropTypes.string,
    PrimaryColor: PropTypes.string,
  }).isRequired,
  recentGames: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentTeamAbrv: PropTypes.string.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
  newsTeamsFail: null || PropTypes.bool,
  newsTeamsLoading: PropTypes.bool.isRequired,
  newsTeams: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchNewsTeams: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamAbrv: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

PageTeamHome.defaultProps = {
  newsTeamsFail: null,
};

const mapStateToProps = ({ newsTeams }) => ({
  newsTeams: newsTeams.newsTeamsData,
  newsTeamsLoading: newsTeams.newsTeamsLoading,
  newsTeamsFail: newsTeams.newsTeamsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchNewsTeams,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(PageTeamHome);
