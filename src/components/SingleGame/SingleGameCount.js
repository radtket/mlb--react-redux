import React from "react";
import PropTypes from "prop-types";

const SingleGameCount = ({ Balls, Strikes, Outs }) => {
  return (
    <div className="circle-graphs">
      <div className="circle-graph four">
        <span className="abbrev">B</span>
        <span
          className={`circle balls ${Balls && Balls > 0 ? "active" : ""}`}
        />
        <span
          className={`circle balls ${Balls && Balls > 1 ? "active" : ""}`}
        />
        <span
          className={`circle balls ${Balls && Balls > 2 ? "active" : ""}`}
        />
        <span
          className={`circle balls ${Balls && Balls > 3 ? "active" : ""}`}
        />
        <span className="description">{Balls} Balls</span>
      </div>
      <div className="circle-graph ">
        <span className="abbrev">S</span>
        <span
          className={`circle strikes ${Strikes && Strikes > 0 ? "active" : ""}`}
        />
        <span
          className={`circle strikes ${Strikes && Strikes > 1 ? "active" : ""}`}
        />
        <span
          className={`circle strikes ${Strikes && Strikes > 2 ? "active" : ""}`}
        />
        <span className="description">{Strikes} Strikes</span>
      </div>
      <div className="circle-graph ">
        <span className="abbrev">O</span>
        <span className={`circle outs ${Outs && Outs > 0 ? "active" : ""}`} />
        <span className={`circle outs ${Outs && Outs > 1 ? "active" : ""}`} />
        <span className={`circle outs ${Outs && Outs > 2 ? "active" : ""}`} />
        <span className="description">{Outs} Outs</span>
      </div>
    </div>
  );
};

SingleGameCount.propTypes = {
  Outs: PropTypes.number,
  Strikes: PropTypes.number,
  Balls: PropTypes.number,
};

SingleGameCount.defaultProps = {
  Outs: null,
  Strikes: null,
  Balls: null,
};

export default SingleGameCount;
