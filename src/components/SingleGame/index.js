import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SingleGameTeam from "./SingleGameTeam";
import SingleGamePlayer from "./SingleGamePlayer";
import SingleGameBaseballDiamond from "./SingleGameBaseballDiamond";
import SingleGameCount from "./SingleGameCount";
import SingleGameLastGame from "./SingleGameLastGame";
import SingleGameHead from "./SingleGameHead";
import { roundHalf } from "../../utils/helpers";
import { TicketStubs } from "../Icons";

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

  return (
    <div
      className={`scoreboard-wrapper
      ${GameStatusInProgress ? "in-progress" : ""}
      ${GameStatusPregame ? "pregame" : ""}
      ${GameStatusFinal ? "is-final" : ""}
      ${HomeTeamWin && GameStatusFinal ? "home-winner" : ""}
      ${!HomeTeamWin && GameStatusFinal ? "away-winner" : ""}
      `}>
      <section className="scoreboard">
        <table
          className={`table table--scoreboard
          ${GameStatusInProgress ? "in-progress" : ""}
          ${GameStatusPregame ? "pregame" : ""}
          ${GameStatusFinal ? "is-final" : ""}
          `}>
          <SingleGameHead
            Channel={Channel}
            DateTime={DateTime}
            GameStatusFinal={GameStatusFinal}
            GameStatusInProgress={GameStatusInProgress}
            GameStatusScheduled={GameStatusScheduled}
            Inning={Inning}
            InningHalf={InningHalf}
            IsClosed={IsClosed}
            GameStatusPregame={GameStatusPregame}
            Status={Status}
          />
          <tbody>
            <SingleGameTeam
              AwayTeam={AwayTeam}
              Errors={AwayTeamErrors}
              Hits={AwayTeamHits}
              Runs={AwayTeamRuns}
              GameStatusPostponed={GameStatusPostponed}
              {...standings.find(team => team.Key === AwayTeam)}
            />
            <SingleGameTeam
              isHome
              HomeTeam={HomeTeam}
              Errors={HomeTeamErrors}
              Hits={HomeTeamHits}
              Runs={HomeTeamRuns}
              GameStatusPostponed={GameStatusPostponed}
              {...standings.find(team => team.Key === HomeTeam)}
            />
          </tbody>
        </table>

        <article className="scoreboard-detail">
          {GameStatusPregame && StadiumObj && (
            <div className="location location-and-weather">
              <ul className="scoreboard-detail__location">
                <li>
                  <strong>{StadiumObj.Name}</strong>
                </li>
                <li>{`${StadiumObj.City}, ${StadiumObj.State}`}</li>
              </ul>

              <div className="weather">
                <a
                  href="http://www.accuweather.com/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <div className="accuweather" />
                </a>
                <div className="accu-weather-icons sm icon-2" />
                <div className="temperature">
                  {ForecastWindChill && `${ForecastWindChill}° F`}
                </div>
              </div>
            </div>
          )}

          {GameStatusPregame && (
            <div className="scoreboard-detail__tickets">
              <TicketStubs />
              <a
                name="&amp;lpos=mlb:scoreboard:tickets"
                href="https://www.vividseats.com/mlb-baseball/cincinnati-reds-tickets/reds-5-6-2821094.html?wsUser=717&amp;wsVar=us~mlb~scoreboard,mlb,desktop,en"
                target="_blank"
                rel="noopener noreferrer">
                Tickets as low as $13
              </a>
            </div>
          )}

          {GameStatusPregame && (
            <ul className="scoreboard-detail__odds">
              {HomeTeamMoneyLine && (
                <li>Line: {`${HomeTeam} ${HomeTeamMoneyLine}`}</li>
              )}
              {OverUnder && <li>O/U: {roundHalf(OverUnder)}</li>}
            </ul>
          )}

          {!GameStatusPregame && GameStatusInProgress && (
            <div className="play-by-play">
              <SingleGameBaseballDiamond
                RunnerOnFirst={RunnerOnFirst}
                RunnerOnSecond={RunnerOnSecond}
                RunnerOnThird={RunnerOnThird}
              />
              <div className="baseball-details">
                <SingleGameCount Balls={Balls} Strikes={Strikes} Outs={Outs} />
                {LastPlay && LastPlay !== "Scrambled" && (
                  <SingleGameLastGame LastPlay={LastPlay} />
                )}
              </div>
              <Link to="/" className="play-by-play-link">
                Play-by-Play
              </Link>
            </div>
          )}
        </article>

        <article className="scoreboard-detail__xtra">
          {GameStatusPregame && (
            <>
              <SingleGamePlayer
                isPitcher
                PlayerHeaderText="Probable Pitchers"
                stats={`(${AwayPitcher.Wins}-${AwayPitcher.Losses}, ${
                  AwayPitcher.EarnedRunAverage
                })`}
                PlayerTeam
                PlayerData={AwayPitcher}
              />
              <SingleGamePlayer
                stats={`(${HomePitcher.Wins}-${HomePitcher.Losses}, ${
                  HomePitcher.EarnedRunAverage
                })`}
                PlayerTeam
                PlayerData={HomePitcher}
              />
            </>
          )}

          {!GameStatusPregame && GameStatusInProgress && (
            <>
              {CurrentPitcher && (
                <SingleGamePlayer
                  isPitcher
                  PlayerHeaderText="Pitching"
                  stats="4.2 IP, ER, 5 H, 4 K, 0 BB"
                  PlayerTeam
                  PlayerData={CurrentPitcher}
                />
              )}
              {CurrentBatter && (
                <SingleGamePlayer
                  PlayerHeaderText="Batting"
                  stats="0-0, BB"
                  PlayerTeam
                  PlayerData={CurrentBatter}
                />
              )}
            </>
          )}
          {GameStatusFinal &&
            (WinningPitcher && (
              <SingleGamePlayer
                isPitcher
                FinalStatPitchers="Win"
                stats={`(${WinningPitcher.Wins}-${WinningPitcher.Losses}, ${
                  WinningPitcher.EarnedRunAverage
                })`}
                PlayerData={WinningPitcher}
              />
            ))}

          {GameStatusFinal &&
            (LosingPitcher && (
              <SingleGamePlayer
                isPitcher
                FinalStatPitchers="Loss"
                stats={`(${LosingPitcher.Wins}-${LosingPitcher.Losses}, ${
                  LosingPitcher.EarnedRunAverage
                })`}
                PlayerData={LosingPitcher}
              />
            ))}

          {GameStatusFinal &&
            (SavingPitcher && (
              <SingleGamePlayer
                isPitcher
                FinalStatPitchers="Save"
                stats={`(${SavingPitcher.Saves})`}
                PlayerData={SavingPitcher}
              />
            ))}
        </article>
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

  stadiums: PropTypes.shape({
    Name: PropTypes.string,
    City: PropTypes.string,
    State: PropTypes.string,
  }).isRequired,
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
};

export default SingleGame;
