import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchPlayer } from "../modules/actions";
import PlayerHeroCard from "../components/PlayerHeroCard";
import LoadingSpinner from "../components/LoadingSpinner";
import PlayerHero from "../components/Player/PlayerHero";
import PlayerNews from "../components/Player/PlayerNews";
import PlayerStats from "../components/Player/PlayerStats";
import { teamFinder } from "../utils/helpers";

const PlayerList = () => {
  const { playerArg } = useParams();
  const dispatch = useDispatch();

  const { playerData, playerLoading, playerError } = useSelector(
    state => state.player
  );

  useEffect(() => {
    dispatch(fetchPlayer(playerArg));
  }, [dispatch, playerArg]);

  if (playerError) {
    return <div>Error! {playerError.message}</div>;
  }

  if (playerLoading) {
    return <LoadingSpinner />;
  }

  if (!playerData) {
    return <h1>Player Not Found</h1>;
  }

  return (
    <div>
      <PlayerHero {...playerData} />
      <PlayerHeroCard {...{ ...playerData, ...teamFinder[playerData.Team] }} />
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>
              <Link to={`/teams/${playerData.Team}`}>{playerData.Team}</Link>
            </h3>
            <PlayerNews {...playerData} />
            <PlayerStats {...playerData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
