import React from "react";
import "./_PlayerCardSmall.scss";

const PlayerCardSmall = () => {
  return (
    <div className="col-sm-8">
      <div className="team-roster__holder">
        <figure className="team-roster__img">
          <a href="#" tabIndex="0">
            <img
              alt=""
              src="https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/mlb/low-res/10000414.png"
            />
            <span className="btn-fab" />
          </a>
        </figure>
        <div className="team-roster__content">
          <header className="team-roster__member-header">
            <div className="team-roster__member-number">38</div>
            <h2 className="team-roster__member-name">
              <span className="team-roster__member-first-name">James</span>{" "}
              <span className="team-roster__member-last-name">Girobili</span>
            </h2>
          </header>
          <div className="team-roster__member-subheader">
            <div className="team-roster__member-position">
              1st Shooting Guard
            </div>
          </div>
          <ul className="team-roster__member-details list-unstyled">
            <li className="team-roster__member-details-item">
              <span className="item-title">Born:</span>{" "}
              <span className="item-desc">Amestris, CA. USA</span>
            </li>
            <li className="team-roster__member-details-item">
              <span className="item-title">Height:</span>{" "}
              <span className="item-desc">6'6"</span>
            </li>
            <li className="team-roster__member-details-item">
              <span className="item-title">Weight:</span>{" "}
              <span className="item-desc">250lbs</span>
            </li>
            <li className="team-roster__member-details-item">
              <span className="item-title">Age:</span>{" "}
              <span className="item-desc">18</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlayerCardSmall;
