import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  PlayerPhotoByID,
  calcBattingAverage,
  calcBattingOBP,
  calcBattingSlug,
} from "../../../../utils/helpers";

const ProfileCard = ({
  AtBats,
  Doubles,
  Games,
  HitByPitch,
  Hits,
  HomeRuns,
  Name,
  PlayerID,
  Runs,
  RunsBattedIn,
  SacrificeFlies,
  Singles,
  StolenBases,
  Strikeouts,
  TotalBases,
  Triples,
  Walks,
}) => {
  const BattingAverage = calcBattingAverage(Hits, AtBats);
  const OnBasePercentage = calcBattingOBP(
    AtBats,
    Hits,
    Walks,
    HitByPitch,
    SacrificeFlies
  );
  const SluggingPercentage = calcBattingSlug(
    AtBats,
    Singles,
    Doubles,
    Triples,
    HomeRuns
  );

  const OnBasePlusSlugging = Number(
    Number(OnBasePercentage) + Number(SluggingPercentage)
  )
    .toFixed(3)
    .replace(/^0+/, "");
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
      <td data-th="Games">{Games}</td>
      <td data-th="AtBats">{Math.round(AtBats)}</td>
      <td data-th="Runs">{Math.round(Runs)}</td>
      <td data-th="Hits">{Math.round(Hits)}</td>
      <td data-th="Doubles">{Math.round(Doubles)}</td>
      <td data-th="Triples">{Math.round(Triples)}</td>
      <td data-th="HomeRuns">{Math.round(HomeRuns)}</td>
      <td data-th="RunsBattedIn">{Math.round(RunsBattedIn)}</td>
      <td data-th="TotalBases">{Math.round(TotalBases)}</td>
      <td data-th="Walks">{Math.round(Walks)}</td>
      <td data-th="Strikeouts">{Math.round(Strikeouts)}</td>
      <td data-th="StolenBases">{Math.round(StolenBases)}</td>
      <td data-th="BattingAverage">{BattingAverage}</td>
      <td data-th="OnBasePercentage">{OnBasePercentage}</td>
      <td data-th="SluggingPercentage">{SluggingPercentage}</td>
      <td data-th="OnBasePlusSlugging">{OnBasePlusSlugging}</td>
    </tr>
  );
};

ProfileCard.propTypes = {
  AtBats: PropTypes.number,
  Doubles: PropTypes.number,
  Games: PropTypes.number,
  HitByPitch: PropTypes.number,
  Hits: PropTypes.number,
  HomeRuns: PropTypes.number,
  Name: PropTypes.string,
  PlayerID: PropTypes.number,
  Runs: PropTypes.number,
  RunsBattedIn: PropTypes.number,
  SacrificeFlies: PropTypes.number,
  Singles: PropTypes.number,
  StolenBases: PropTypes.number,
  Strikeouts: PropTypes.number,
  TotalBases: PropTypes.number,
  Triples: PropTypes.number,
  Walks: PropTypes.number,
};

ProfileCard.defaultProps = {
  AtBats: 0,
  Doubles: 0,
  Games: 0,
  HitByPitch: 0,
  Hits: 0,
  HomeRuns: 0,
  Name: null,
  PlayerID: 0,
  Runs: 0,
  RunsBattedIn: 0,
  SacrificeFlies: 0,
  Singles: 0,
  StolenBases: 0,
  Strikeouts: 0,
  TotalBases: 0,
  Triples: 0,
  Walks: 0,
};

export default ProfileCard;
