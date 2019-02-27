import React, { Component } from "react";

export default class PlayerHero extends Component {
  render() {
    return (
      <section className="player-heading">
        <div className="container">
          <div className="player-info__team-logo">
            <img
              src="http://alchemists.dan-fisher.com/basketball/assets/images/logo-lg.png"
              alt=""
            />
          </div>

          <div className="player-info__title player-info__title--mobile">
            <div className="player-info__number">38</div>
            <h1 className="player-info__name">
              <span className="player-info__first-name">James </span>
              <span className="player-info__last-name">Girobili</span>
            </h1>
          </div>

          <main className="player-info">
            <div className="player-info__item player-info__item--photo">
              <figure className="player-info__photo">
                <img
                  src="http://alchemists.dan-fisher.com/basketball/assets/images/samples/player-heading-photo.png"
                  alt=""
                />
              </figure>
            </div>

            <section className="player-info__item player-info__item--details">
              <header className="player-info__title player-info__title--desktop">
                <div className="player-info__number">38</div>
                <h1 className="player-info__name">
                  <span className="player-info__first-name">James</span>{" "}
                  <span className="player-info__last-name">Girobili</span>
                </h1>
              </header>

              <article className="player-info-details">
                <div className="player-info-details__item player-info-details__item--height">
                  <h6 className="player-info-details__title">Height</h6>
                  <div className="player-info-details__value">6'9"</div>
                </div>
                <div className="player-info-details__item player-info-details__item--weight">
                  <h6 className="player-info-details__title">Weight</h6>
                  <div className="player-info-details__value">295 lbs</div>
                </div>
                <div className="player-info-details__item player-info-details__item--age">
                  <h6 className="player-info-details__title">Age</h6>
                  <div className="player-info-details__value">18</div>
                </div>
                <div className="player-info-details__item player-info-details__item--college">
                  <h6 className="player-info-details__title">College</h6>
                  <div className="player-info-details__value">
                    Rockbell Bay College
                  </div>
                </div>
                <div className="player-info-details__item player-info-details__item--born">
                  <h6 className="player-info-details__title">Born</h6>
                  <div className="player-info-details__value">
                    Amestris, California. USA
                  </div>
                </div>
                <div className="player-info-details__item player-info-details__item--position">
                  <h6 className="player-info-details__title">Position</h6>
                  <div className="player-info-details__value">
                    1st Shooting Guard
                  </div>
                </div>
              </article>
            </section>
          </main>
        </div>
      </section>
    );
  }
}
