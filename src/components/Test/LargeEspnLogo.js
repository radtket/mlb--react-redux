import React from "react";

const LargeEspnLogo = () => {
  return (
    <div className="playerheader__image--container">
      <div className="playerheader__image">
        <figure className="espn-image aspect-ratio--parent playerheader__logo playerheader__logo--opaque">
          <div className="espn-image__wrapper aspect-ratio--1x1">
            <img
              className="aspect-ratio--child"
              alt="Tampa Bay Buccaneers"
              title="Tampa Bay Buccaneers"
              data-mptype="image"
              src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/tb.png&w=250&h=250"
            />
          </div>
        </figure>
        <div className="playerheader__overlay--detail" />
        <div className="playerheader__overlay playerheader__overlay--right" />
        <div className="playerheader__overlay playerheader__overlay--right playerheader__overlay--opaque" />
      </div>
      <div className="playerheader__overlay playerheader__overlay--left" />
    </div>
  );
};

export default LargeEspnLogo;
