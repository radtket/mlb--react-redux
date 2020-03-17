import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSportsRadarGames } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import GameSlider from "../components/GameDatesSlider/GameSlider";
import PageTitle from "../components/PageTitle";

const SchedulesList = () => {
  const dispatch = useDispatch();

  const {
    sportsRadarGamesData,
    sportsRadarGamesLoading,
    sportsRadarGamesError,
  } = useSelector(state => state.sportsRadarGames);

  useEffect(() => {
    dispatch(fetchSportsRadarGames());
  }, [dispatch]);

  if (sportsRadarGamesError) {
    return <div>Error! {sportsRadarGamesError.message}</div>;
  }

  if (sportsRadarGamesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <PageTitle title="Todays Games" />
          <GameSlider schedules={sportsRadarGamesData} />
        </div>
      </div>
    </div>
  );
};

export default SchedulesList;
