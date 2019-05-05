import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SingleGamePlayer = ({ isPitcher, stats }) => {
  return (
    <>
      <header className="sb-header">
        <h1>{isPitcher ? "Pitching" : "Batting"}</h1>
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
              <p>{stats}</p>
            </figcaption>
          </li>
        </ul>
      </div>
    </>
  );
};

SingleGamePlayer.propTypes = {
  isPitcher: PropTypes.bool,
  stats: PropTypes.string.isRequired,
};

SingleGamePlayer.defaultProps = {
  isPitcher: false,
};

export default SingleGamePlayer;
