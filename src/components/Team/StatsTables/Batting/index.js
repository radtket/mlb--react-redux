import React, { useState } from "react";
import PropTypes from "prop-types";
import Sort from "./Sort";
import Roster from "./Roster";

const StatsTableBatting = ({ players }) => {
  const [StatePlayers, setStatePlayers] = useState([...players]);

  const [direction, setDirection] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);

  const sortRosterStateBy = (field, playersArg, sortDirection) => {
    playersArg.sort((a, b) => {
      if (a[field] === null) {
        return 1;
      }
      if (b[field] === null) {
        return -1;
      }
      if (a[field] === b[field]) {
        return 0;
      }
      if (a[field] > b[field]) {
        return -sortDirection;
      }
      if (a[field] < b[field]) {
        return sortDirection;
      }
      return 0;
    });

    // Change state
    setStatePlayers(playersArg);
    setDirection(-sortDirection);
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
        <Sort {...{ players, direction, sortRosterStateBy }} />
        <Roster players={StatePlayers} />
      </table>
    </div>
  );
};

StatsTableBatting.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StatsTableBatting;
