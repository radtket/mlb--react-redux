import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { fetchPlayer } from "../../modules/player/actions";
import PlayerHero from "../../components/PlayerHero";

class PlayerList extends Component {
  componentDidMount() {
    const { fetchPlayer: getPlayer, match } = this.props;
    const { playerArg } = match.params;
    getPlayer(playerArg);
  }

  render() {
    const { playerFail, playerLoading, player } = this.props;
    const { Team } = player;

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
          <Link to={`/teams/${Team}`}>{Team}</Link>
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
