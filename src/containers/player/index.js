import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { fetchPlayer } from "../../modules/player/actions";
import { fetchPlayerNews } from "../../modules/playerNews/actions";
import { fetchPlayerStats } from "../../modules/playerStats/actions";

import PlayerHero from "../../components/PlayerHero";
import NewsArticle from "../newsAllTeams/NewsArticle";

class PlayerList extends Component {
  componentDidMount() {
    const {
      fetchPlayer: getPlayer,
      fetchPlayerNews: getPlayerNews,
      fetchPlayerStats: getPlayerStats,
      player,
      match,
    } = this.props;
    const { RotoWirePlayerID, PositionCategory } = player;
    const { playerArg } = match.params;
    getPlayer(playerArg);
    getPlayerNews(playerArg);
    RotoWirePlayerID &&
      PositionCategory &&
      getPlayerStats(RotoWirePlayerID, PositionCategory);
  }

  componentDidUpdate(prevProps) {
    const {
      RotoWirePlayerID: PrevRotoWirePlayerID,
      PositionCategory: PrevPositionCategory,
    } = prevProps.player;

    const { RotoWirePlayerID, PositionCategory } = this.props.player;
    if (
      RotoWirePlayerID !== PrevRotoWirePlayerID ||
      PositionCategory !== PrevPositionCategory
    ) {
      this.props.fetchPlayerStats(RotoWirePlayerID, PositionCategory);
    }
  }

  render() {
    const {
      playerFail,
      playerLoading,
      player,
      playerNewsFail,
      playerNewsLoading,
      playerNews,
      playerStatsFail,
      playerStatsLoading,
      playerStats,
    } = this.props;
    const { Team, MLBAMID } = player;

    if (playerFail) {
      return <div>Error! {playerFail.message}</div>;
    }

    if (playerNewsFail) {
      return <div>Error! {playerNewsFail.message}</div>;
    }

    if (playerStatsFail) {
      return <div>Error! {playerStatsFail.message}</div>;
    }

    if (playerLoading || playerNewsLoading || playerStatsLoading) {
      return <div>Loading...</div>;
    }

    console.log(playerStats);

    return (
      player && (
        <div>
          <PlayerHero {...player} />
          <div className="container">
            <div className="row">
              <div className="col-sm-8">
                {playerNews.length ? (
                  playerNews.map(article => {
                    const { NewsID } = article;
                    return (
                      <NewsArticle
                        key={NewsID}
                        MLBAMID={MLBAMID}
                        {...article}
                      />
                    );
                  })
                ) : (
                  <h1>No News</h1>
                )}
              </div>
              <div className="col-sm-4">
                <Link to={`/teams/${Team}`}>{Team}</Link>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

PlayerList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      playerArg: PropTypes.string.isRequired,
    }),
  }).isRequired,
  playerFail: null || PropTypes.bool,
  playerLoading: PropTypes.bool.isRequired,
  player: PropTypes.shape({
    Team: PropTypes.string,
    Name: PropTypes.string,
    Position: PropTypes.string,
  }).isRequired,
  fetchPlayer: PropTypes.func.isRequired,
  playerNewsFail: null || PropTypes.bool,
  playerNewsLoading: PropTypes.bool.isRequired,
  playerNews: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchPlayerNews: PropTypes.func.isRequired,
  playerStatsFail: null || PropTypes.bool,
  playerStatsLoading: PropTypes.bool.isRequired,
  playerStats: PropTypes.object.isRequired,
  fetchPlayerStats: PropTypes.func.isRequired,
};

PlayerList.defaultProps = {
  playerFail: null,
  playerNewsFail: null,
  playerStatsFail: null,
};

const mapStateToProps = ({ player, playerNews, playerStats }) => ({
  player: player.playerData,
  playerLoading: player.playerLoading,
  playerFail: player.playerError,
  playerNews: playerNews.playerNewsData,
  playerNewsLoading: playerNews.playerNewsLoading,
  playerNewsFail: playerNews.playerNewsError,
  playerStats: playerStats.playerStatsData,
  playerStatsLoading: playerStats.playerStatsLoading,
  playerStatsFail: playerStats.playerStatsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPlayer,
      fetchPlayerNews,
      fetchPlayerStats,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(PlayerList);
