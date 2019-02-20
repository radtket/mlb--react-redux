import React from "react";

const SingleTeam = ({ Name, City }) => {
  return (
    <li className="team" itemProp="name">
      <a
        itemProp="url"
        href="/mlb/team/_/name/bal/baltimore-orioles"
        className="sprite-mlb-teams-25 sprite-25-team-1"
        name="&amp;lpos=subnav+subnav_mlb_team_baltimore_orioles"
        data-teamid="1"
        data-sport="mlb">
        <span>
          <span className="link-text">
            {City} {Name}
          </span>
          <span className="link-text-short">{Name}</span>
        </span>
      </a>
    </li>
  );
};

export default SingleTeam;
