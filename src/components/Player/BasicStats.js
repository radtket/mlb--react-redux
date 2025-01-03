import React, { useState } from "react";
import { Table } from "rsuite";
import PropTypes from "prop-types";
import ImageCell from "./ImageCell";
import { tableSort } from "../../utils/helpers";

const { Column, HeaderCell, Cell } = Table;

const BasicStats = ({ isPitcher, data }) => {
  const [loading, setloading] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortType, setSortType] = useState("asc");

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
      return dataArg.sort((a, b) => tableSort(a, b, sortType, sortColumn));
    }
    return dataArg;
  };

  return (
    <Table
      autoHeight
      data={getData(data)}
      loading={loading}
      onSortColumn={handleSortColumn}
      sortColumn={sortColumn}
      sortType={sortType}
    >
      <Column align="center" fixed flexGrow={1} sortable>
        <HeaderCell>Season</HeaderCell>
        <Cell dataKey="season" />
      </Column>
      <Column align="center" fixed flexGrow={1} sortable>
        <HeaderCell>Team</HeaderCell>
        <ImageCell dataKey="team" />
      </Column>
      <Column align="center" fixed flexGrow={1} sortable>
        <HeaderCell>Lg</HeaderCell>
        <Cell dataKey="league_level" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>Age</HeaderCell>
        <Cell dataKey="age" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>G</HeaderCell>
        <Cell dataKey="games" />
      </Column>
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>PA</HeaderCell>
          <Cell dataKey="pa" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>AB</HeaderCell>
          <Cell dataKey="ab" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>R</HeaderCell>
          <Cell dataKey="r" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>H</HeaderCell>
          <Cell dataKey="h" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>XBH</HeaderCell>
          <Cell dataKey="xbh" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>2B</HeaderCell>
          <Cell dataKey="b2" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>3B</HeaderCell>
          <Cell dataKey="b3" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>HR</HeaderCell>
          <Cell dataKey="hr" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>RBI</HeaderCell>
          <Cell dataKey="rbi" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>SB</HeaderCell>
          <Cell dataKey="sb" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>CS</HeaderCell>
          <Cell dataKey="cs" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>BB</HeaderCell>
          <Cell dataKey="bb" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>SO</HeaderCell>
          <Cell dataKey="so" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>SH</HeaderCell>
          <Cell dataKey="sh" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>SF</HeaderCell>
          <Cell dataKey="sf" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>HBP</HeaderCell>
          <Cell dataKey="hbp" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>AVG</HeaderCell>
          <Cell dataKey="avg" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>OBP</HeaderCell>
          <Cell dataKey="obp" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>SLG</HeaderCell>
          <Cell dataKey="slg" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>OPS</HeaderCell>
          <Cell dataKey="ops" />
        </Column>
      )}

      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>GS</HeaderCell>
          <Cell dataKey="gs" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>SH</HeaderCell>
          <Cell dataKey="sh" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>IP</HeaderCell>
          <Cell dataKey="ip" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>H</HeaderCell>
          <Cell dataKey="h" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>ER</HeaderCell>
          <Cell dataKey="er" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>HR</HeaderCell>
          <Cell dataKey="hr" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>K</HeaderCell>
          <Cell dataKey="k" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>BB</HeaderCell>
          <Cell dataKey="bb" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>W</HeaderCell>
          <Cell dataKey="w" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>L</HeaderCell>
          <Cell dataKey="l" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>SV</HeaderCell>
          <Cell dataKey="sv" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>BS</HeaderCell>
          <Cell dataKey="bs" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>HLD</HeaderCell>
          <Cell dataKey="hld" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>ERA</HeaderCell>
          <Cell dataKey="era" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
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
