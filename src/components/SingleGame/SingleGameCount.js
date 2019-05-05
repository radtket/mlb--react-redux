import React from "react";
import PropTypes from "prop-types";

const SingleGameCount = ({ Balls, Strikes, Outs }) => {
  return (
    <div className="circle-graphs">
      <div className="circle-graph four">
        <span className="abbrev">B</span>
        <span className="circle balls " />
        <span className="circle balls " />
        <span className="circle balls " />
        <span className="circle balls " />
        <span className="description">{Balls} Balls</span>
      </div>
      <div className="circle-graph ">
        <span className="abbrev">S</span>
        <span className="circle strikes " />
        <span className="circle strikes " />
        <span className="circle strikes " />
        <span className="description">{Strikes} Strikes</span>
      </div>
      <div className="circle-graph ">
        <span className="abbrev">O</span>
        <span className="circle outs " />
        <span className="circle outs " />
        <span className="circle outs " />
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
