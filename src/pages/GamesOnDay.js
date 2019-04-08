/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addDays, subDays, format } from "date-fns";
import { fetchGamesOnDay } from "../modules/games-on-day/actions";
import { fetchStandings } from "../modules/standings/actions";
import {
  // TODO: Add When API is Live
  // TodaysDate,
  DEV_PLACEHOLDER_DATE,
} from "../utils/helpers";
import SingleGame from "../components/SingleGame";

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

  previousDaysGame = date => this.changeDate(subDays(new Date(date), 1));

  nextDaysGame = date => this.changeDate(addDays(new Date(date), 1));

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

    return (
      <div>
        <h1>Games For {format(new Date(dateOfGame), "dddd, MMMM Do YYYY")}</h1>
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
