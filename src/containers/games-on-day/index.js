/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { fetchGamesOnDay } from "../../modules/games-on-day/actions";
import { fetchStandings } from "../../modules/standings/actions";
import {
  // TODO: Add When API is Live
  // TodaysDate,
  DEV_PLACEHOLDER_DATE,
  teamFinder,
} from "../../utils/helpers";
import SingleGame from "./SingleGame";
import TeamLogo from "./TeamLogo";

class GamesOnDayList extends Component {
  state = {
    // TODO: Add When API is Live
    // dateOfGame: TodaysDate
    dateOfGame: DEV_PLACEHOLDER_DATE,
  };

  componentDidMount() {
    const { dateOfGame } = this.state;
    const { fetchGamesOnDay: getGamesOnDay } = this.props;
    getGamesOnDay(dateOfGame);
  }

  componentDidUpdate(_prevProps, _prevState, snapshot) {
    if (snapshot !== null) {
      const { fetchGamesOnDay: getGamesOnDay } = this.props;
      this.changeDate(snapshot);
      getGamesOnDay(snapshot);
    }
  }

  getSnapshotBeforeUpdate(_prevProps, prevState) {
    const { dateOfGame: thisDateOfGame } = this.state;
    const { dateOfGame: prevDateOfGame } = prevState;
    if (prevDateOfGame !== thisDateOfGame) {
      return thisDateOfGame;
    }
    return null;
  }

  changeDate = date => {
    return this.setState({
      dateOfGame: date,
    });
  };

  previousDaysGame = date => this.changeDate(moment(date).subtract(1, "d"));

  nextDaysGame = date => this.changeDate(moment(date).add(1, "d"));

  render() {
    const {
      gamesOnDayFail,
      gamesOnDayLoading,
      standingsError,
      gamesOnDay,
      standings,
      standingsLoading,
    } = this.props;
    const { dateOfGame } = this.state;

    if (gamesOnDayFail) {
      return <div>Error! {gamesOnDayFail.message}</div>;
    }
    if (standingsError) {
      return <div>Error! {standingsError.message}</div>;
    }

    if (gamesOnDayLoading || standingsLoading) {
      return <div>Loading...</div>;
    }

    // console.log(gamesOnDay, standings);

    return (
      <div>
        <header>
          <figure className="away">
            <TeamLogo Team={teamFinder("MIL")} />
          </figure>
          <figure className="home">
            <TeamLogo Team={teamFinder("WSH")} />
          </figure>
        </header>

        <h1>Games For {dateOfGame.format("dddd, MMMM Do YYYY").toString()}</h1>
        <nav>
          <button
            onClick={() => this.previousDaysGame(dateOfGame)}
            type="button">
            Previous
          </button>
          <button onClick={() => this.nextDaysGame(dateOfGame)} type="button">
            Next
          </button>
        </nav>
        <ul>
          {gamesOnDay &&
            gamesOnDay.map(game => (
              <SingleGame key={game.GameID} standings={standings} {...game} />
            ))}
        </ul>
      </div>
    );
  }
}

GamesOnDayList.propTypes = {
  gamesOnDayFail: null || PropTypes.bool,
  gamesOnDayLoading: PropTypes.bool.isRequired,
  gamesOnDay: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchGamesOnDay: PropTypes.func.isRequired,
  standingsError: null || PropTypes.bool,
  standingsLoading: PropTypes.bool.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GamesOnDayList.defaultProps = {
  gamesOnDayFail: null,
  standingsError: null,
};

const mapStateToProps = ({ gamesOnDay, standings }) => ({
  gamesOnDay: gamesOnDay.gamesOnDayData,
  gamesOnDayLoading: gamesOnDay.gamesOnDayLoading,
  gamesOnDayFail: gamesOnDay.gamesOnDayError,
  standings: standings.standingsData,
  standingsLoading: standings.standingsLoading,
  standingsError: standings.standingsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchGamesOnDay,
      fetchStandings,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(GamesOnDayList);
