import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { fetchPlayer } from "../modules/actions";

import { PlayerHero, PlayerNews, PlayerStats } from "../components/Player";

const PlayerList = ({
  playerFail,
  playerLoading,
  player,
  match,
  fetchPlayer: getPlayer,
}) => {
  useEffect(() => {
    const { playerArg } = match.params;
    getPlayer(playerArg);
  }, []);

  const { playerArg } = match.params;
  const { Team, MLBAMID, PositionCategory, RotoWirePlayerID } = player;

  if (playerFail) {
    return <div>Error! {playerFail.message}</div>;
  }

  if (playerLoading) {
    return <div>Loading...</div>;
  }

  return (
    player && (
      <div>
        <PlayerHero {...player} />
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h3>
                <Link to={`/teams/${Team}`}>{Team}</Link>
              </h3>
              <PlayerNews MLBAMID={MLBAMID} playerArg={playerArg} />
              <PlayerStats
                RotoWirePlayerID={RotoWirePlayerID}
                PositionCategory={PositionCategory}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(PlayerList);
