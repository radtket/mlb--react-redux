import React, { useState, useEffect, useRef } from "react";
import { Table } from "rsuite";
import PropTypes from "prop-types";
import ImageCell from "./ImageCell";

const { Column, HeaderCell, Cell } = Table;

const BasicStats = ({ isPitcher, data: PropsData }) => {
  const mounted = useRef();
  const [data, setData] = useState(PropsData);
  const [loading, setloading] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortType, setSortType] = useState("asc");

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // do componentDidUpate logic
      setData(PropsData);
    }
  });

  const handleSortColumn = (sortColumnArg, sortTypeArg) => {
    setloading(true);

    setTimeout(() => {
      setSortType(sortTypeArg);
      setSortColumn(sortColumnArg);
      setloading(false);
    }, 500);
  };

  const getData = dataArg => {
    if (sortColumn && sortType) {
      return dataArg.sort((a, b) => {
        const x = a[sortColumn];
        const y = b[sortColumn];
        if (x === null) {
          return 1;
        }
        if (y === null) {
          return -1;
        }
        if (x === y) {
          return 0;
        }
        if (sortType === "asc") {
          return x - y;
        }
        if (sortType !== "asc") {
          return y - x;
        }
        return 0;
      });
    }
    return dataArg;
  };

  return (
    <Table
      autoHeight
      data={getData(data)}
      loading={loading}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}>
      <Column flexGrow={1} align="center" sortable fixed>
        <HeaderCell>Season</HeaderCell>
        <Cell dataKey="season" />
      </Column>
      <Column flexGrow={1} align="center" sortable fixed>
        <HeaderCell>Team</HeaderCell>
        <ImageCell dataKey="team" />
      </Column>
      <Column flexGrow={1} align="center" sortable fixed>
        <HeaderCell>Lg</HeaderCell>
        <Cell dataKey="league_level" />
      </Column>
      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>Age</HeaderCell>
        <Cell dataKey="age" />
      </Column>
      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>G</HeaderCell>
        <Cell dataKey="games" />
      </Column>
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>PA</HeaderCell>
          <Cell dataKey="pa" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>AB</HeaderCell>
          <Cell dataKey="ab" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>R</HeaderCell>
          <Cell dataKey="r" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>H</HeaderCell>
          <Cell dataKey="h" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>XBH</HeaderCell>
          <Cell dataKey="xbh" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>2B</HeaderCell>
          <Cell dataKey="b2" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>3B</HeaderCell>
          <Cell dataKey="b3" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>HR</HeaderCell>
          <Cell dataKey="hr" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>RBI</HeaderCell>
          <Cell dataKey="rbi" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>SB</HeaderCell>
          <Cell dataKey="sb" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>CS</HeaderCell>
          <Cell dataKey="cs" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>BB</HeaderCell>
          <Cell dataKey="bb" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>SO</HeaderCell>
          <Cell dataKey="so" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>SH</HeaderCell>
          <Cell dataKey="sh" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>SF</HeaderCell>
          <Cell dataKey="sf" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>HBP</HeaderCell>
          <Cell dataKey="hbp" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>AVG</HeaderCell>
          <Cell dataKey="avg" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>OBP</HeaderCell>
          <Cell dataKey="obp" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>SLG</HeaderCell>
          <Cell dataKey="slg" />
        </Column>
      )}
      {!isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>OPS</HeaderCell>
          <Cell dataKey="ops" />
        </Column>
      )}

      {isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>GS</HeaderCell>
          <Cell dataKey="gs" />
        </Column>
      )}
      {isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>SH</HeaderCell>
          <Cell dataKey="sh" />
        </Column>
      )}
      {isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>IP</HeaderCell>
          <Cell dataKey="ip" />
        </Column>
      )}
      {isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>H</HeaderCell>
          <Cell dataKey="h" />
        </Column>
      )}
      {isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>ER</HeaderCell>
          <Cell dataKey="er" />
        </Column>
      )}
      {isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>HR</HeaderCell>
          <Cell dataKey="hr" />
        </Column>
      )}
      {isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>K</HeaderCell>
          <Cell dataKey="k" />
        </Column>
      )}
      {isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>BB</HeaderCell>
          <Cell dataKey="bb" />
        </Column>
      )}
      {isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>W</HeaderCell>
          <Cell dataKey="w" />
        </Column>
      )}
      {isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>L</HeaderCell>
          <Cell dataKey="l" />
        </Column>
      )}
      {isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>SV</HeaderCell>
          <Cell dataKey="sv" />
        </Column>
      )}
      {isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>BS</HeaderCell>
          <Cell dataKey="bs" />
        </Column>
      )}
      {isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>HLD</HeaderCell>
          <Cell dataKey="hld" />
        </Column>
      )}
      {isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>ERA</HeaderCell>
          <Cell dataKey="era" />
        </Column>
      )}
      {isPitcher && (
        <Column flexGrow={1} align="center" sortable>
          <HeaderCell>WHIP</HeaderCell>
          <Cell dataKey="whip" />
        </Column>
      )}
    </Table>
  );
};

BasicStats.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isPitcher: PropTypes.bool.isRequired,
};

export default BasicStats;
