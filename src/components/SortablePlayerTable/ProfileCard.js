import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { birthday, inchesToFeet } from "../../utils/helpers";

const ProfileCard = ({
  BatHand,
  BirthCity,
  BirthDate,
  BirthState,
  FirstName,
  Height,
  Jersey,
  LastName,
  PhotoUrl,
  PlayerID,
  Position,
  ThrowHand,
  Weight,
}) => {
  return (
    <tr>
      <td data-th="Name">
        <Link className="table--roster__avatar" to={`/player/${PlayerID}`}>
          <figure
            alt={`${FirstName} ${LastName}`}
            className="rounded"
            style={{ backgroundImage: `url(${PhotoUrl})` }}
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
        {`${BirthCity && BirthCity} ${
          BirthState !== null ? `, ${BirthState}` : ""
        }`}
      </td>
    </tr>
  );
};

ProfileCard.propTypes = {
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
  BirthState: PropTypes.string,
  PhotoUrl: PropTypes.string,
  PlayerID: PropTypes.number,
};

ProfileCard.defaultProps = {
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
  BirthState: null,
  PhotoUrl: null,
  PlayerID: null,
};

export default ProfileCard;
