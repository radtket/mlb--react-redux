import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSportsRadarGames } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import GameSlider from "../components/GameDatesSlider/GameSlider";
import PageTitle from "../components/PageTitle";

const SchedulesList = ({
  sportsRadarGamesFail,
  sportsRadarGamesLoading,
  sportsRadarGames,
  fetchSportsRadarGames: getSportsRadarGames,
}) => {
  useEffect(() => {
    getSportsRadarGames();
  }, []);

  if (sportsRadarGamesFail) {
    return <div>Error! {sportsRadarGamesFail.message}</div>;
  }

  if (sportsRadarGamesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <PageTitle title="Todays Games" />
          <GameSlider schedules={sportsRadarGames} />
        </div>
      </div>
    </div>
  );
};

SchedulesList.propTypes = {
  sportsRadarGamesFail: PropTypes.bool,
  sportsRadarGamesLoading: PropTypes.bool.isRequired,
  sportsRadarGames: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchSportsRadarGames: PropTypes.func.isRequired,
};

SchedulesList.defaultProps = {
  sportsRadarGamesFail: null,
};

const mapStateToProps = ({ sportsRadarGames }) => ({
  sportsRadarGames: sportsRadarGames.sportsRadarGamesData,
  sportsRadarGamesLoading: sportsRadarGames.sportsRadarGamesLoading,
  sportsRadarGamesFail: sportsRadarGames.sportsRadarGamesError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSportsRadarGames,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(SchedulesList);
