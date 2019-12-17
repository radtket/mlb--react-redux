import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { fetchPlayer } from "../modules/actions";
import PlayerHeroCard from "../components/PlayerHeroCard";
import LoadingSpinner from "../components/LoadingSpinner";
import PlayerHero from "../components/Player/PlayerHero";
import PlayerNews from "../components/Player/PlayerNews";
import PlayerStats from "../components/Player/PlayerStats";
import { teamFinder } from "../utils/helpers";

const PlayerList = ({
  playerFail,
  playerLoading,
  player,
  match: {
    params: { playerArg },
  },
  fetchPlayer: getPlayer,
}) => {
  useEffect(() => {
    getPlayer(playerArg);
  }, []);

  if (playerFail) {
    return <div>Error! {playerFail.message}</div>;
  }

  if (playerLoading) {
    return <LoadingSpinner />;
  }

  if (!player) {
    return <h1>Player Not Found</h1>;
  }

  return (
    <div>
      <PlayerHero {...player} />
      <PlayerHeroCard {...{ ...player, ...teamFinder[player.Team] }} />
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>
              <Link to={`/teams/${player.Team}`}>{player.Team}</Link>
            </h3>
            <PlayerNews {...player} />
            <PlayerStats {...player} />
          </div>
        </div>
      </div>
    </div>
  );
};

PlayerList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      playerArg: PropTypes.string.isRequired,
    }),
  }).isRequired,
  playerFail: PropTypes.bool,
  playerLoading: PropTypes.bool.isRequired,
  player: PropTypes.shape({
    Team: PropTypes.string,
    Name: PropTypes.string,
    Position: PropTypes.string,
    RotoWirePlayerID: PropTypes.number,
    PositionCategory: PropTypes.string,
  }).isRequired,
  fetchPlayer: PropTypes.func.isRequired,
};

PlayerList.defaultProps = {
  playerFail: null,
};

const mapStateToProps = ({ player }) => ({
  player: player.playerData,
  playerLoading: player.playerLoading,
  playerFail: player.playerError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPlayer,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PlayerList);
