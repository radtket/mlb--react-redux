import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import SingleGameTeam from "./SingleGameTeam";
import SingleGamePlayer from "./SingleGamePlayer";
import SingleGameBaseballDiamond from "./SingleGameBaseballDiamond";
import SingleGameCount from "./SingleGameCount";
import SingleGameLastGame from "./SingleGameLastGame";
import SingleGameHead from "./SingleGameHead";

import { IconCaret } from "../Icons";
import SingleGameInningScoreboard from "./Scoreboard/SingleGameInningScoreboard";

import LocationAndWeather from "./LocationAndWeather";
import Tickets from "./Tickets";
import Odds from "./Odds";

const SingleGame = ({
  AwayTeam,
  AwayTeamErrors,
  AwayTeamHits,
  AwayTeamRuns,

  HomeTeam,
  HomeTeamErrors,
  HomeTeamHits,
  HomeTeamRuns,

  Inning,
  InningHalf,
  Innings,

  Status,
  standings,
  IsClosed,

  Balls,
  Strikes,
  Outs,

  RunnerOnFirst,
  RunnerOnSecond,
  RunnerOnThird,

  LastPlay,

  DateTime,
  Channel,

  allPlayers,

  AwayTeamProbablePitcherID,
  HomeTeamProbablePitcherID,
  CurrentPitcherID,
  CurrentHitterID,

  WinningPitcherID,
  SavingPitcherID,
  LosingPitcherID,

  ForecastWindChill,
  StadiumID,

  HomeTeamMoneyLine,
  OverUnder,

  stadiums,
  gameTicket,
  GameID,
}) => {
  const GameStatusFinal = IsClosed && Status === "Final";
  const GameStatusScheduled = Status === "Scheduled";
  const GameStatusInProgress = Status === "InProgress";
  const GameStatusPostponed = Status === "Postponed";
  const GameStatusPregame = !IsClosed && GameStatusScheduled && !Inning;

  const HomeTeamWin = HomeTeamRuns > AwayTeamRuns;

  const HomePitcher = allPlayers.find(
    player => player.PlayerID === HomeTeamProbablePitcherID
  );

  const AwayPitcher = allPlayers.find(
    player => player.PlayerID === AwayTeamProbablePitcherID
  );

  const CurrentPitcher =
    CurrentPitcherID &&
    allPlayers.find(player => player.PlayerID === CurrentPitcherID);

  const CurrentBatter =
    CurrentHitterID &&
    allPlayers.find(player => player.PlayerID === CurrentHitterID);

  const WinningPitcher =
    WinningPitcherID &&
    allPlayers.find(player => player.PlayerID === WinningPitcherID);

  const LosingPitcher =
    LosingPitcherID &&
    allPlayers.find(player => player.PlayerID === LosingPitcherID);

  const SavingPitcher =
    SavingPitcherID &&
    allPlayers.find(player => player.PlayerID === SavingPitcherID);

  const StadiumObj = stadiums.find(stadium => stadium.StadiumID === StadiumID);

  const [ScoreboardTreyVisible, setScoreboardTreyVisible] = useState("hide");

  function toggleScoreboardTrey() {
    setScoreboardTreyVisible(
      ScoreboardTreyVisible === "hide" ? "show" : "hide"
    );
  }

  return (
    <div
      className={classnames("scoreboard-wrapper", {
        "in-progress": GameStatusInProgress,
        pregame: GameStatusPregame,
        "is-final": GameStatusFinal,
        "home-winner": HomeTeamWin && GameStatusFinal,
        "away-winner": !HomeTeamWin && GameStatusFinal,
      })}
    >
      <section className="scoreboard">
        <table
          className={classnames("table table--scoreboard", {
            "in-progress": GameStatusInProgress,
            pregame: GameStatusPregame,
            "is-final": GameStatusFinal,
          })}
        >
          <SingleGameHead
            Channel={Channel}
            DateTime={DateTime}
            GameStatusFinal={GameStatusFinal}
            GameStatusInProgress={GameStatusInProgress}
            GameStatusPregame={GameStatusPregame}
            GameStatusScheduled={GameStatusScheduled}
            Inning={Inning}
            InningHalf={InningHalf}
            IsClosed={IsClosed}
            Status={Status}
          />
          <tbody>
            <SingleGameTeam
              AwayTeam={AwayTeam}
              Errors={AwayTeamErrors}
              GameStatusPostponed={GameStatusPostponed}
              Hits={AwayTeamHits}
              Runs={AwayTeamRuns}
              {...standings.find(team => team.Key === AwayTeam)}
            />
            <SingleGameTeam
              Errors={HomeTeamErrors}
              GameStatusPostponed={GameStatusPostponed}
              Hits={HomeTeamHits}
              HomeTeam={HomeTeam}
              isHome
              Runs={HomeTeamRuns}
              {...standings.find(team => team.Key === HomeTeam)}
            />
          </tbody>
        </table>

        <article className="scoreboard-detail">
          {GameStatusPregame ? (
            <>
              {StadiumObj && (
                <LocationAndWeather {...{ ...StadiumObj, ForecastWindChill }} />
              )}
              {gameTicket && <Tickets {...{ gameTicket }} />}
              <Odds {...{ HomeTeamMoneyLine, HomeTeam, OverUnder }} />
            </>
          ) : (
            <>
              {GameStatusInProgress && (
                <div className="play-by-play">
                  <SingleGameBaseballDiamond
                    RunnerOnFirst={RunnerOnFirst}
                    RunnerOnSecond={RunnerOnSecond}
                    RunnerOnThird={RunnerOnThird}
                  />
                  <div className="baseball-details">
                    <SingleGameCount
                      Balls={Balls}
                      Outs={Outs}
                      Strikes={Strikes}
                    />
                    {LastPlay && LastPlay !== "Scrambled" && (
                      <SingleGameLastGame LastPlay={LastPlay} />
                    )}
                  </div>
                  {/* <Link to="/" className="play-by-play-link">
                Play-by-Play
              </Link> */}
                </div>
              )}
              {!GameStatusPostponed && (
                <button
                  className="scoreboard__tray--button"
                  onClick={toggleScoreboardTrey}
                  type="button"
                >
                  {ScoreboardTreyVisible === "hide"
                    ? "Show Box Score"
                    : "Hide  Box Score"}
                  <figure>
                    <IconCaret />
                  </figure>
                </button>
              )}
            </>
          )}
        </article>

        <article className="scoreboard-detail__xtra">
          {GameStatusPregame && (
            <>
              {AwayPitcher && (
                <SingleGamePlayer
                  isPitcher
                  PlayerData={AwayPitcher}
                  PlayerHeaderText="Probable Pitchers"
                  PlayerTeam
                  stats={`(${AwayPitcher.Wins}-${AwayPitcher.Losses}, ${AwayPitcher.EarnedRunAverage})`}
                />
              )}

              {HomePitcher && (
                <SingleGamePlayer
                  PlayerData={HomePitcher}
                  PlayerTeam
                  stats={`(${HomePitcher.Wins}-${HomePitcher.Losses}, ${HomePitcher.EarnedRunAverage})`}
                />
              )}
            </>
          )}

          {!GameStatusPregame && GameStatusInProgress && (
            <>
              {CurrentPitcher && (
                <SingleGamePlayer
                  isPitcher
                  PlayerData={CurrentPitcher}
                  PlayerHeaderText="Pitching"
                  PlayerTeam
                  stats="4.2 IP, ER, 5 H, 4 K, 0 BB"
                />
              )}
              {CurrentBatter && (
                <SingleGamePlayer
                  PlayerData={CurrentBatter}
                  PlayerHeaderText="Batting"
                  PlayerTeam
                  stats="0-0, BB"
                />
              )}
            </>
          )}

          {GameStatusFinal && (
            <>
              {WinningPitcher && (
                <SingleGamePlayer
                  FinalStatPitchers="Win"
                  isPitcher
                  PlayerData={WinningPitcher}
                  stats={`(${WinningPitcher.Wins}-${WinningPitcher.Losses}, ${WinningPitcher.EarnedRunAverage})`}
                />
              )}

              {LosingPitcher && (
                <SingleGamePlayer
                  FinalStatPitchers="Loss"
                  isPitcher
                  PlayerData={LosingPitcher}
                  stats={`(${LosingPitcher.Wins}-${LosingPitcher.Losses}, ${LosingPitcher.EarnedRunAverage})`}
                />
              )}

              {SavingPitcher && (
                <SingleGamePlayer
                  FinalStatPitchers="Save"
                  isPitcher
                  PlayerData={SavingPitcher}
                  stats={`(${SavingPitcher.Saves})`}
                />
              )}
            </>
          )}
        </article>
      </section>

      <section
        className={`scoreboard__tray scoreboard__tray--${ScoreboardTreyVisible}`}
      >
        <SingleGameInningScoreboard
          AwayTeam={AwayTeam}
          AwayTeamErrors={AwayTeamErrors}
          AwayTeamHits={AwayTeamHits}
          AwayTeamRuns={AwayTeamRuns}
          GameID={GameID}
          HomeTeam={HomeTeam}
          HomeTeamErrors={HomeTeamErrors}
          HomeTeamHits={HomeTeamHits}
          HomeTeamRuns={HomeTeamRuns}
          Innings={Innings}
          InningsInRegulation={9}
        />
      </section>
    </div>
  );
};

SingleGame.propTypes = {
  AwayTeam: PropTypes.string.isRequired,
  AwayTeamErrors: PropTypes.number,
  AwayTeamHits: PropTypes.number,
  AwayTeamRuns: PropTypes.number,
  Balls: PropTypes.number,
  HomeTeam: PropTypes.string.isRequired,
  HomeTeamErrors: PropTypes.number,
  HomeTeamHits: PropTypes.number,
  HomeTeamRuns: PropTypes.number,
  Inning: PropTypes.number,
  InningHalf: PropTypes.string,
  Outs: PropTypes.number,
  Strikes: PropTypes.number,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
  IsClosed: PropTypes.bool.isRequired,
  Status: PropTypes.string.isRequired,

  RunnerOnFirst: PropTypes.bool,
  RunnerOnSecond: PropTypes.bool,
  RunnerOnThird: PropTypes.bool,

  LastPlay: PropTypes.string,
  DateTime: PropTypes.string,

  allPlayers: PropTypes.arrayOf(PropTypes.object).isRequired,
  Channel: PropTypes.string,

  AwayTeamProbablePitcherID: PropTypes.number,
  HomeTeamProbablePitcherID: PropTypes.number,
  CurrentPitcherID: PropTypes.number,
  CurrentHitterID: PropTypes.number,

  WinningPitcherID: PropTypes.number,
  SavingPitcherID: PropTypes.number,
  LosingPitcherID: PropTypes.number,

  ForecastWindChill: PropTypes.number,
  StadiumID: PropTypes.number,

  HomeTeamMoneyLine: PropTypes.number,
  OverUnder: PropTypes.number,

  stadiums: PropTypes.arrayOf(PropTypes.object).isRequired,
  gameTicket: PropTypes.shape({
    url: PropTypes.string,
    stats: PropTypes.shape({
      lowest_price: PropTypes.number,
    }),
  }),
  Innings: PropTypes.arrayOf(PropTypes.object).isRequired,
  GameID: PropTypes.number.isRequired,
};

SingleGame.defaultProps = {
  Outs: null,
  Strikes: null,
  Balls: null,
  Inning: null,
  HomeTeamErrors: null,
  HomeTeamHits: null,
  HomeTeamRuns: null,
  AwayTeamErrors: null,
  AwayTeamHits: null,
  AwayTeamRuns: null,
  InningHalf: null,
  RunnerOnFirst: null,
  RunnerOnSecond: null,
  RunnerOnThird: null,
  LastPlay: null,
  DateTime: null,
  Channel: null,

  AwayTeamProbablePitcherID: null,
  HomeTeamProbablePitcherID: null,
  CurrentPitcherID: null,
  CurrentHitterID: null,

  WinningPitcherID: null,
  SavingPitcherID: null,
  LosingPitcherID: null,

  ForecastWindChill: null,
  StadiumID: null,

  HomeTeamMoneyLine: null,
  OverUnder: null,
  gameTicket: null,
};

export default SingleGame;
