import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { PlayerPhotoByID } from "../../../../utils/helpers";

const ProfileCard = ({
  EarnedRunAverage,
  Games,
  InningsPitchedFull,
  Losses,
  Name,
  PitchingEarnedRuns,
  PitchingHits,
  PitchingHolds,
  PitchingHomeRuns,
  PitchingQualityStarts,
  PitchingStrikeouts,
  PitchingStrikeoutsPerNineInnings,
  PitchingWalks,
  PlayerID,
  Saves,
  Started,
  Wins,
}) => {
  return (
    <tr>
      <td data-th="Name">
        <Link className="table--roster__avatar" to={`/player/${PlayerID}`}>
          <figure
            alt={Name}
            className="rounded"
            style={{ backgroundImage: `url(${PlayerPhotoByID(PlayerID)})` }}
          />
          <span>{Name}</span>
        </Link>
      </td>
      <td data-th="Games played">{Games}</td>
      <td data-th="Games started">{Started}</td>
      <td data-th="Quality Starts">{PitchingQualityStarts}</td>
      <td data-th="Wins">{Wins}</td>
      <td data-th="Losses">{Losses}</td>
      <td data-th="Saves">{Saves}</td>
      <td data-th="Holds">{PitchingHolds}</td>
      <td data-th="Innings pitched">{InningsPitchedFull}</td>
      <td data-th="Hits">{PitchingHits}</td>
      <td data-th="Earned runs">{PitchingEarnedRuns}</td>
      <td data-th="Home runs">{PitchingHomeRuns}</td>
      <td data-th="Walks">{PitchingWalks}</td>
      <td data-th="Strikeouts">{PitchingStrikeouts}</td>
      <td data-th="Strikeouts per 9 innings">
        {PitchingStrikeoutsPerNineInnings}
      </td>
      <td data-th="Walks + Hits per Inning pitched">{}</td>
      <td data-th="Earned run average">{EarnedRunAverage}</td>
    </tr>
  );
};

ProfileCard.propTypes = {
  PlayerID: PropTypes.number,
  Name: PropTypes.string,
  Games: PropTypes.number,
  Started: PropTypes.number,
  PitchingQualityStarts: PropTypes.number,
  Wins: PropTypes.number,
  Losses: PropTypes.number,
  Saves: PropTypes.number,
  EarnedRunAverage: PropTypes.number,
  PitchingHolds: PropTypes.number,
  InningsPitchedFull: PropTypes.number,
  PitchingHits: PropTypes.number,
  PitchingEarnedRuns: PropTypes.number,
  PitchingHomeRuns: PropTypes.number,
  PitchingWalks: PropTypes.number,
  PitchingStrikeouts: PropTypes.number,
  PitchingStrikeoutsPerNineInnings: PropTypes.number,
};

ProfileCard.defaultProps = {
  PlayerID: "-",
  Name: "-",
  Games: "-",
  Started: "-",
  PitchingQualityStarts: "-",
  Wins: "-",
  Losses: "-",
  Saves: "-",
  EarnedRunAverage: "-",
  PitchingHolds: "-",
  InningsPitchedFull: "-",
  PitchingHits: "-",
  PitchingEarnedRuns: "-",
  PitchingHomeRuns: "-",
  PitchingWalks: "-",
  PitchingStrikeouts: "-",
  PitchingStrikeoutsPerNineInnings: "-",
};

export default ProfileCard;
