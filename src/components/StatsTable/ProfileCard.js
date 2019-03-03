import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  PlayerPhotoByID,
  calcBattingAverage,
  calcBattingOBP,
  calcBattingSlug,
} from "../../utils/helpers";

const ProfileCard = ({ player }) => {
  const {
    PlayerID,
    Name,
    Games,
    AtBats,
    Runs,
    Hits,
    Doubles,
    Triples,
    HomeRuns,
    RunsBattedIn,
    TotalBases,
    Walks,
    Strikeouts,
    StolenBases,

    SacrificeFlies,
    HitByPitch,
    Singles,
  } = player;

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
        <Link to={`/player/${PlayerID}`} className="table--roster__avatar">
          <figure
            className="rounded"
            style={{ backgroundImage: `url(${PlayerPhotoByID(PlayerID)})` }}
            alt={Name}
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
  player: PropTypes.shape({
    Position: PropTypes.string,
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    Jersey: PropTypes.number,
    BatHand: PropTypes.string,
    ThrowHand: PropTypes.string,
    BirthDate: PropTypes.string,
    Height: PropTypes.number,
    Weight: PropTypes.number,
    BirthCity: PropTypes.string,
  }),
};

ProfileCard.defaultProps = {
  player: PropTypes.shape({
    Position: "-",
    FirstName: "-",
    LastName: "-",
    Jersey: "-",
    BatHand: "-",
    ThrowHand: "-",
    BirthDate: "-",
    Height: "-",
    Weight: "-",
    BirthCity: "-",
  }),
};

export default ProfileCard;
