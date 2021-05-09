import React, { useState } from "react";
import PropTypes from "prop-types";
import Sort from "./Sort";
import Roster from "./Roster";
import { secondarySort } from "../../../../utils/helpers";

const StatsTableBatting = ({ players }) => {
  const [StatePlayers, setStatePlayers] = useState([...players]);

  const [direction, setDirection] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);

  const sortRosterStateBy = field => {
    setStatePlayers(prev => {
      return prev.sort((a, b) => secondarySort(a, b, field, direction));
    });
    setDirection(prev => -prev);
  };

  return (
    <div
      className={`table--wrap  ${isScrolling && "isScrolling"}`}
      onScroll={() => {
        if (!isScrolling) {
          setIsScrolling(true);

          setTimeout(() => {
            setIsScrolling(false);
          }, 300);
        }
      }}
    >
      <table className="table table--roster" style={{ marginTop: 24 }}>
        <Sort {...{ sortRosterStateBy }} />
        <Roster players={StatePlayers} />
      </table>
    </div>
  );
};

StatsTableBatting.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StatsTableBatting;
