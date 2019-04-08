import React from "react";
import TeamLogo from "./TeamLogo";
import { teamFinder } from "../../../utils/helpers";

const TeamLogoBanner = () => {
  return (
    <header>
      <figure className="away">
        <TeamLogo Team={teamFinder("MIL")} />
      </figure>
      <figure className="home">
        <TeamLogo Team={teamFinder("WSH")} />
      </figure>
    </header>
  );
};

export default TeamLogoBanner;
