import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SingleGameTeam from "./SingleGameTeam";
import SingleGamePlayer from "./SingleGamePlayer";
import SingleGameBaseballDiamond from "./SingleGameBaseballDiamond";
import SingleGameCount from "./SingleGameCount";
import SingleGameLastGame from "./SingleGameLastGame";
import SingleGameHead from "./SingleGameHead";

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
}) => {
  const GameIsFinal = IsClosed && Status === "Final";
  const GameIsScheduled = Status === "Scheduled";

  const HomeTeamWin = HomeTeamRuns > AwayTeamRuns;

  return (
    <div
      className={`scoreboard-wrapper
      ${!IsClosed && Status === "Scheduled" && "in-progress"}
      ${GameIsFinal && "is-final"}
      ${HomeTeamWin && GameIsFinal && "home-winner"}
      ${!HomeTeamWin && GameIsFinal && "away-winner"}`}>
      <section className="scoreboard">
        <table
          className={`table table--scoreboard ${
            IsClosed ? "in-progress" : ""
          }`}>
          <SingleGameHead
            GameIsScheduled={GameIsScheduled}
            IsClosed={IsClosed}
            Status={Status}
            InningHalf={InningHalf}
            Inning={Inning}
          />
          <tbody>
            <SingleGameTeam
              AwayTeam={AwayTeam}
              Errors={AwayTeamErrors}
              Hits={AwayTeamHits}
              Runs={AwayTeamRuns}
              {...standings.find(team => team.Key === AwayTeam)}
            />
            <SingleGameTeam
              isHome
              HomeTeam={HomeTeam}
              Errors={HomeTeamErrors}
              Hits={HomeTeamHits}
              Runs={HomeTeamRuns}
              {...standings.find(team => team.Key === HomeTeam)}
            />
          </tbody>
        </table>

        <article className="scoreboard-detail">
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
        </article>

        <article className="scoreboard-detail__xtra">
          <SingleGamePlayer isPitcher stats="0.0 IP, 0 ER, 0 H, 0 BB" />
          <SingleGamePlayer stats="0-2, R, BB, SB, K" />
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
};

export default SingleGame;
