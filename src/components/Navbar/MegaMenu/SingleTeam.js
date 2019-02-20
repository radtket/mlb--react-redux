import React from "react";
import { Link } from "react-router-dom";
import { espnLogo } from "../../../utils/helpers";

const SingleTeam = ({ Name, City, Key, WikipediaLogoUrl }) => {
  return (
    <Link to={`/teams/${Key}`} style={{ display: "block" }}>
      {/* <img src={WikipediaLogoUrl} alt={`${Name} ${City} Logo`} /> */}
      <img src={espnLogo(Key, 24)} alt={`${Name} ${City} Logo`} />
      <span>
        <span className="team-city">{City} </span>
        {Name}
      </span>
    </Link>
  );
};

export default SingleTeam;
