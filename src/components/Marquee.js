import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Marquee = ({ MarqueeData, MarqueeItems = 5 }) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useLayoutEffect(() => {
    return () => {
      setScreenWidth(window.innerWidth);
    };
  });

  return (
    <div className="marquee-wrap">
      <div className="marquee-title">
        <h4>BREAKING NEWS</h4>
      </div>
      <div className="marquee">
        {MarqueeData.slice(0, `${MarqueeItems}`).map(key => {
          const { NewsID, Title } = key;
          return (
            <Link key={NewsID} className="marquee__item" to={`/news/${NewsID}`}>
              {Title}
            </Link>
          );
        })}
        <div
          className="marquee__item marquee__item--offset"
          style={{ width: `${screenWidth}px` }}
        />
      </div>
    </div>
  );
};

Marquee.propTypes = {
  MarqueeData: PropTypes.arrayOf(PropTypes.object).isRequired,
  MarqueeItems: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Marquee.defaultProps = {
  MarqueeItems: 5,
};

export default Marquee;
