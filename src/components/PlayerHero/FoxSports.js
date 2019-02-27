import React, { Component } from "react";

export default class FoxSports extends Component {
  render() {
    return (
      <section className="bio">
        <div className="bio__branding">
          <div className="bio__branding--teamBranding">
            <div className="bio__branding--team">
              <div className="bio__branding--stripe" />
              <div className="bio__branding--stripe-offset" />
              <img
                src="https://b.fssta.com/uploads/content/dam/fsdigital/fscom/global/dev/static_resources/nfl/teams/retina/27.vresize.184.184.medium.0.png"
                alt=""
              />
              <div className="bio__branding--stripe-offset__top" />
            </div>
          </div>
        </div>
        <figure className="bio__headshot">
          <img
            src="https://b.fssta.com/uploads/application/nfl/headshots/12920.vresize.350.425.medium.68.png"
            alt=""
          />
        </figure>

        <article className="bio__info">
          <h2 className="bio__info--name">Mehdi Abdesmad </h2>
        </article>
      </section>
    );
  }
}
