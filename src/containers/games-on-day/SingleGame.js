import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
	espnLogo,
	getNumberWithOrdinal,
	inningHalfDecoder,
} from "../../utils/helpers";

const SingleGame = ({
	AwayTeam,
	AwayTeamErrors,
	AwayTeamHits,
	AwayTeamRuns,
	Balls,
	HomeTeam,
	HomeTeamErrors,
	HomeTeamHits,
	HomeTeamRuns,
	Inning,
	InningHalf,
	Outs,
	Strikes,
	Status,
	standings,
	IsClosed,
}) => {
	const {
		Name: AwayTeamName,
		Losses: AwayTeamLosses,
		Wins: AwayTeamWins,
		AwayLosses: AwayTeamAwayLosses,
		AwayWins: AwayTeamAwayWins,
	} = standings.find(team => team.Key === AwayTeam);

	const {
		Name: HomeTeamName,
		Losses: HomeTeamLosses,
		Wins: HomeTeamWins,
		HomeLosses: HomeTeamHomeLosses,
		HomeWins: HomeTeamHomeWins,
	} = standings.find(team => team.Key === HomeTeam);

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
					<thead>
						<tr>
							<th className="date-time">
								{!GameIsScheduled && Status}
								{!IsClosed && GameIsScheduled
									? `${inningHalfDecoder(InningHalf)} ${getNumberWithOrdinal(
											Inning
									  )}`
									: ""}
							</th>
							<th className="score">R</th>
							<th className="score">H</th>
							<th className="score">E</th>
						</tr>
					</thead>
					<tbody>
						<tr className="away">
							<td className="team team__away">
								<Link to={`/teams/${AwayTeam}`} className="team__logo--wrap">
									<img
										className="team__logo"
										src={espnLogo(`${AwayTeam}`, 70)}
										alt=""
									/>
								</Link>
								<div className="team__meta">
									<Link to={`/teams/${AwayTeam}`} className="team__name">
										<span className="team__name--full">{AwayTeamName}</span>
										<span className="team__name--abrv">{AwayTeam}</span>
									</Link>
									<ul className="team__record--wrap">
										<li className="team__record">
											({AwayTeamWins}-{AwayTeamLosses}
											<span className="team__record--away">
												, {AwayTeamAwayWins}-{AwayTeamAwayLosses} away
											</span>
											)
										</li>
									</ul>
								</div>
							</td>
							<td className="score score__total">{AwayTeamRuns}</td>
							<td className="score">{AwayTeamHits}</td>
							<td className="score">{AwayTeamErrors}</td>
						</tr>

						<tr className="home">
							<td className="team team__home">
								<Link to={`/teams/${HomeTeam}`} className="team__logo--wrap">
									<img
										className="team__logo"
										src={espnLogo(`${HomeTeam}`, 70)}
										alt=""
									/>
								</Link>
								<div className="team__meta">
									<Link to={`/teams/${HomeTeam}`} className="team__name">
										<span className="team__name--full">{HomeTeamName}</span>
										<span className="team__name--abrv">{HomeTeam}</span>
									</Link>
									<ul className="team__record--wrap">
										<li className="team__record">
											({HomeTeamWins}-{HomeTeamLosses}
											<span className="team__record--home">
												, {HomeTeamHomeWins}-{HomeTeamHomeLosses} home
											</span>
											)
										</li>
									</ul>
								</div>
							</td>
							<td className="score score__total">{HomeTeamRuns}</td>
							<td className="score">{HomeTeamHits}</td>
							<td className="score">{HomeTeamErrors}</td>
						</tr>
					</tbody>
				</table>

				<article className="scoreboard-detail">
					<div className="play-by-play">
						<figure className="mlb-icons">
							<ul className="bases status base-1-0-0">
								<li className="base base__second" />
								<li className="base base__third" />
								<li className="base base__first" />
							</ul>
						</figure>

						<div className="baseball-details">
							<div className="circle-graphs">
								<div className="circle-graph  four">
									<span className="abbrev">B</span>
									<span className="circle balls " />
									<span className="circle balls " />
									<span className="circle balls " />
									<span className="circle balls " />
									<span className="description">{Balls} Balls</span>
								</div>
								<div className="circle-graph ">
									<span className="abbrev">S</span>
									<span className="circle strikes " />
									<span className="circle strikes " />
									<span className="circle strikes " />
									<span className="description">{Strikes} Strikes</span>
								</div>
								<div className="circle-graph ">
									<span className="abbrev">O</span>
									<span className="circle outs " />
									<span className="circle outs " />
									<span className="circle outs " />
									<span className="description">{Outs} Outs</span>
								</div>
							</div>
							<p className="last-play">
								<span className="title">Last Play:</span>
								<span className="text">
									Ryan Eades pitches to Mike Yastrzemski
								</span>
							</p>
						</div>
						<Link to="/" className="play-by-play-link">
							Play-by-Play
						</Link>
					</div>
				</article>

				<article className="scoreboard-detail__xtra">
					<header className="sb-header">
						<h1>Pitching</h1>
					</header>
					<div className="sb-content">
						<ul className="team">
							<li>
								<figure
									className="rounded"
									alt="Chris Owings"
									style={{
										backgroundImage:
											'url("https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/mlb/low-res/10000034.png")',
									}}
								/>
								<figcaption className="sb-meta">
									<h2>
										<Link to="/player">R. Eades</Link>
									</h2>
									<p>0.0 IP, 0 ER, 0 H, 0 BB</p>
								</figcaption>
							</li>
						</ul>
					</div>

					<header className="sb-header">
						<h1>Batting</h1>
					</header>
					<div className="sb-content">
						<ul className="team">
							<li>
								<figure
									className="rounded"
									alt="Chris Owings"
									style={{
										backgroundImage:
											'url("https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/mlb/low-res/10000034.png")',
									}}
								/>
								<figcaption className="sb-meta">
									<h2>
										<Link to="/player">R. Eades</Link>
									</h2>
									<p>0-2, R, BB, SB, K</p>
								</figcaption>
							</li>
						</ul>
					</div>
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
};

export default SingleGame;
