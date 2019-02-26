import React from "react";
import "./_PlayerCardLarge.scss";

const PlayerCardLarge = () => {
  return (
    <div className="widget__content card__content">
      <div className="widget-player__team-logo">
        <img
          alt=""
          src="http://alchemists.dan-fisher.com/basketball/assets/images/logo.png"
        />
      </div>
      <figure className="widget-player__photo">
        <img
          alt=""
          src="http://alchemists.dan-fisher.com/basketball/assets/images/samples/widget-featured-player.png"
        />
      </figure>
      <header className="widget-player__header clearfix">
        <div className="widget-player__number">38</div>
        <h4 className="widget-player__name">
          <span className="widget-player__first-name">James</span>{" "}
          <span className="widget-player__last-name">Girobili</span>
        </h4>
      </header>
      <div className="widget-player__content">
        <div className="widget-player__content-inner">
          <div className="widget-player__stat widget-player__assists">
            <h6 className="widget-player__stat-label">Assists</h6>
            <div className="widget-player__stat-number">16.9</div>
            <div className="widget-player__stat-legend">AVG</div>
          </div>
          <div className="widget-player__stat widget-player__steals">
            <h6 className="widget-player__stat-label">Steals</h6>
            <div className="widget-player__stat-number">7.2</div>
            <div className="widget-player__stat-legend">AVG</div>
          </div>
          <div className="widget-player__stat widget-player__blocks">
            <h6 className="widget-player__stat-label">Blocks</h6>
            <div className="widget-player__stat-number">12.4</div>
            <div className="widget-player__stat-legend">AVG</div>
          </div>
        </div>
      </div>
      <footer className="widget-player__footer">
        <span className="widget-player__footer-txt">1st Shooting Guard</span>
      </footer>
    </div>
  );
};

export default PlayerCardLarge;
