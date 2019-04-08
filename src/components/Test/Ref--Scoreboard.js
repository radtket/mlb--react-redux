import React from "react";
import { Link } from "react-router-dom";

const RefScoreboard = () => {
  return (
    <div className="scoreboard-wrapper">
      <section className="scoreboard">
        <table className="table table--scoreboard">
          <thead>
            <tr>
              <th className="date-time">Top 8th</th>
              <th className="score">R</th>
              <th className="score">H</th>
              <th className="score">E</th>
            </tr>
          </thead>
          <tbody>
            <tr className="away">
              <td className="team team__away">
                <Link to="/" className="team__logo--wrap">
                  <img
                    className="team__logo"
                    src="https://a1.espncdn.com/combiner/i?img=/i/teamlogos/mlb/500/scoreboard/bal.png&h=70&w=70"
                    alt=""
                  />
                </Link>
                <div className="team__meta">
                  <Link to="/" className="team__name">
                    <span className="team__name--full">Orioles</span>
                    <span className="team__name--abrv">BAL</span>
                  </Link>
                  <ul className="team__record--wrap">
                    <li className="team__record">
                      (2-0
                      <span className="team__record--away">, 0-0 away</span>)
                    </li>
                  </ul>
                </div>
              </td>
              <td className="score score__total">1</td>
              <td className="score">6</td>
              <td className="score">2</td>
            </tr>

            <tr className="home">
              <td className="team team__home">
                <Link to="/" className="team__logo--wrap">
                  <img
                    className="team__logo"
                    src="https://a1.espncdn.com/combiner/i?img=/i/teamlogos/mlb/500/scoreboard/min.png&h=70&w=70"
                    alt=""
                  />
                </Link>
                <div className="team__meta">
                  <Link to="/" className="team__name">
                    <span className="team__name--full">Twins</span>
                    <span className="team__name--abrv">MIN</span>
                  </Link>
                  <ul className="team__record--wrap">
                    <li className="team__record">
                      (2-0
                      <span className="team__record--home">, 0-0 home</span>)
                    </li>
                  </ul>
                </div>
              </td>
              <td className="score score__total">1</td>
              <td className="score">6</td>
              <td className="score">2</td>
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
                  <span className="description">0 Balls</span>
                </div>
                <div className="circle-graph ">
                  <span className="abbrev">S</span>
                  <span className="circle strikes " />
                  <span className="circle strikes " />
                  <span className="circle strikes " />
                  <span className="description">0 Strikes</span>
                </div>
                <div className="circle-graph ">
                  <span className="abbrev">O</span>
                  <span className="circle outs " />
                  <span className="circle outs " />
                  <span className="circle outs " />
                  <span className="description">0 Outs</span>
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

export default RefScoreboard;
