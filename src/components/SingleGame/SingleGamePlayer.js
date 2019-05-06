import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { splitPlayerName } from "../../utils/helpers";

const SingleGamePlayer = ({
  FinalStatPitchers,
  PlayerData,
  PlayerHeaderText,
  PlayerTeam,
  stats,
}) => {
  const PlayerName = PlayerData && PlayerData.Name;
  const PlayerID = PlayerData && PlayerData.PlayerID;

  return (
    <>
      {PlayerHeaderText && (
        <header className="sb-header">
          <h1>{PlayerHeaderText}</h1>
        </header>
      )}
      <div className="sb-content">
        <ul className="team">
          <li>
            <figure
              className="rounded"
              alt={PlayerName}
              style={{
                backgroundImage: `url("https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/mlb/low-res/${PlayerID}.png")`,
              }}
            />
            <figcaption className="sb-meta">
              {FinalStatPitchers && (
                <p className="sb-meta__player--result">{FinalStatPitchers}</p>
              )}
              <h2>
                <Link to="/player">{splitPlayerName(PlayerName)}</Link>
                {PlayerTeam && (
                  <span className="sb-meta__player--team">
                    {PlayerData.Team}
                  </span>
                )}
              </h2>
              {!FinalStatPitchers && (
                <p className="sb-meta__player--stat">{stats}</p>
              )}
            </figcaption>
            {FinalStatPitchers && (
              <p
                style={{
                  display: "table-cell",
                  width: "74px",
                  verticalAlign: "middle",
                }}
                className="sb-meta__player--stat text-right">
                {stats}
              </p>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

SingleGamePlayer.propTypes = {
  FinalStatPitchers: PropTypes.string,
  PlayerData: PropTypes.shape({
    PlayerID: PropTypes.number,
    Name: PropTypes.string,
    Team: PropTypes.string,
  }).isRequired,
  PlayerHeaderText: PropTypes.string,
  PlayerTeam: PropTypes.bool,
  stats: PropTypes.string.isRequired,
};

SingleGamePlayer.defaultProps = {
  FinalStatPitchers: null,
  PlayerHeaderText: null,
  PlayerTeam: false,
};

export default SingleGamePlayer;
