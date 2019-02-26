import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { birthday, inchesToFeet } from "../../utils/helpers";

const ProfileCard = ({ player }) => {
  const {
    PhotoUrl,
    FirstName,
    LastName,
    Position,
    BatHand,
    Jersey,
    PlayerID,
    ThrowHand,
    Height,
    Weight,
    BirthDate,
    BirthCity,
    BirthState,
  } = player;
  return (
    <tr>
      <td data-th="Name">
        <Link to={`/player/${PlayerID}`} className="table--roster__avatar">
          <figure
            className="rounded"
            style={{ backgroundImage: `url(${PhotoUrl})` }}
            alt={`${FirstName} ${LastName}`}
          />
          <span style={{ display: "none" }}>
            {typeof Jersey === "number" ? Jersey : ""}
          </span>
          <span>
            <small>{FirstName} </small>
            {LastName}
          </span>
        </Link>
      </td>
      <td data-th="Position">
        {typeof Position === "string" ? Position : "-"}
      </td>
      <td data-th="Bat Hand">{typeof BatHand === "string" ? BatHand : "-"}</td>
      <td data-th="Throw Hand">
        {typeof ThrowHand === "string" ? ThrowHand : "-"}
      </td>
      <td data-th="Age">{birthday(BirthDate)}</td>
      <td data-th="Height">
        {typeof Height === "number" ? inchesToFeet(Height) : "-"}
      </td>
      <td data-th="Weight">{typeof Weight === "number" ? Weight : "-"}</td>
      <td data-th="Birthplace">
        {{ BirthCity } && { BirthState }
          ? `${BirthCity}${BirthState !== null ? `, ${BirthState}` : ""}`
          : { BirthCity }}
      </td>
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
