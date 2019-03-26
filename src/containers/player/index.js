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
import BatterStats from "./BatterStats";
import PitcherStats from "./PitcherStats";

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

  componentDidUpdate(prevProps, _prevState, snapshot) {
    const { fetchPlayerStats: getPlayerStats, player, match } = this.props;
    const { playerArg: currentplayerArg } = match.params;
    const { playerArg: prevplayerArg } = prevProps.match.params;

    const { RotoWirePlayerID, PositionCategory } = player;

    if (snapshot !== null) {
      const { thisRotoWirePlayerID, thisPositionCategory } = snapshot;
      getPlayerStats(thisRotoWirePlayerID, thisPositionCategory);
    }

    if (currentplayerArg !== prevplayerArg) {
      getPlayerStats(RotoWirePlayerID, PositionCategory);
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { player: thisPlayer } = this.props;
    const { player: prevPlayer } = prevProps;
    const {
      RotoWirePlayerID: thisRotoWirePlayerID,
      PositionCategory: thisPositionCategory,
    } = thisPlayer;
    const { RotoWirePlayerID: prevRotoWirePlayerID } = prevPlayer;

    if (prevRotoWirePlayerID !== thisRotoWirePlayerID) {
      return { thisRotoWirePlayerID, thisPositionCategory };
    }
    return null;
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
    const { Team, MLBAMID, PositionCategory, RotoWirePlayerID } = player;

    if (playerFail) {
      return <div>Error! {playerFail.message}</div>;
    }

    if (playerNewsFail) {
      return <div>Error! {playerNewsFail.message}</div>;
    }

    if (playerStatsFail) {
      return <div>Error! {playerStatsFail.message}</div>;
    }

    if (
      playerLoading ||
      playerNewsLoading ||
      playerStatsLoading ||
      !playerStats.basic
    ) {
      return <div>Loading...</div>;
    }

    return (
      player && (
        <div>
          <PlayerHero {...player} />
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
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
                <h3>
                  <Link to={`/teams/${Team}`}>{Team}</Link>
                </h3>
                <h3>
                  {PositionCategory === "P" ? "Pitching" : "Batting"} Stats
                </h3>
                {PositionCategory === "P"
                  ? playerStats.basic.pitching && (
                      <PitcherStats
                        data={playerStats.basic.pitching.body}
                        RotoWirePlayerID={RotoWirePlayerID}
                      />
                    )
                  : playerStats.basic.batting && (
                      <BatterStats
                        data={playerStats.basic.batting.body}
                        RotoWirePlayerID={RotoWirePlayerID}
                      />
                    )}
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
    RotoWirePlayerID: PropTypes.number,
    PositionCategory: PropTypes.string,
  }).isRequired,
  fetchPlayer: PropTypes.func.isRequired,
  playerNewsFail: null || PropTypes.bool,
  playerNewsLoading: PropTypes.bool.isRequired,
  playerNews: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchPlayerNews: PropTypes.func.isRequired,
  playerStatsFail: null || PropTypes.bool,
  playerStatsLoading: PropTypes.bool.isRequired,
  playerStats: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  ).isRequired,
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
