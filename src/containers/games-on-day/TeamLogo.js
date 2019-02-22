import React from "react";
import { espnLogo } from "../../utils/helpers";

const TeamLogo = ({ Team }) => {
  const { Name, City, Key, PrimaryColor } = Team;
  return (
    <div
      className="team__banner rendered"
      style={{ background: `#${PrimaryColor}` }}>
      <figure className="team__banner__wrapper">
        <img src={espnLogo(Key, 208)} alt={`${Name} ${City} Logo`} />
      </figure>
    </div>
  );
};

export default TeamLogo;
