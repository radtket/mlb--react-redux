import React from "react";
import PropTypes from "prop-types";
import { birthday, inchesToFeet } from "../../utils/helpers";

const ProfileCard = ({ player }) => {
  const {
    PhotoUrl,
    FirstName,
    LastName,
    Position,
    BatHand,
    Jersey,
    ThrowHand,
    Height,
    Weight,
    BirthDate,
    BirthCity,
    BirthState
  } = player;
  return (
    <tr>
      <td>
        <img src={PhotoUrl} alt={`${FirstName} ${LastName}`} />
      </td>
      <td>
        {FirstName} {LastName}
        <small> {typeof Jersey === "number" ? Jersey : ""}</small>
      </td>
      <td>{typeof Position === "string" ? Position : "-"}</td>
      <td>{typeof BatHand === "string" ? BatHand : "-"}</td>
      <td>{typeof ThrowHand === "string" ? ThrowHand : "-"}</td>
      <td>{birthday(BirthDate)}</td>
      <td>{typeof Height === "number" ? inchesToFeet(Height) : "-"}</td>
      <td>{typeof Weight === "number" ? Weight : "-"}</td>
      <td>
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
    BirthCity: PropTypes.string
  })
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
    BirthCity: "-"
  })
};

export default ProfileCard;
