import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Sort from "./Sort";
import Roster from "./Roster";
import { isArrayEmpty } from "../../../../utils/helpers";

const StatsTablePitching = props => {
  const { players: PropsPlayers } = props;
  const [StatePlayers, setStatePlayers] = useState([]);
  const [direction, setDirection] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleTableScroll = () => {
    document.querySelector(".table--wrap").addEventListener("scroll", () => {
      if (!isScrolling) {
        setIsScrolling(true);

        setTimeout(() => {
          setIsScrolling(false);
        }, 300);
      }
    });
  };

  useEffect(() => {
    const { players } = props;
    handleTableScroll();

    isArrayEmpty(StatePlayers) &&
      !isArrayEmpty(players) &&
      setStatePlayers(players);
  });

  const sortRosterStateBy = (field, players, sortDirection) => {
    players.sort((a, b) => {
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
    setStatePlayers(players);
    setDirection(-sortDirection);
  };

  return (
    <div className={`table--wrap  ${isScrolling && "isScrolling"}`}>
      <table className="table table--roster" style={{ marginTop: 24 }}>
        <Sort
          direction={direction}
          players={PropsPlayers}
          sortRosterStateBy={sortRosterStateBy}
        />
        <Roster players={StatePlayers} />
      </table>
    </div>
  );
};

StatsTablePitching.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StatsTablePitching;
