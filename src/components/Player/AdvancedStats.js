import React, { useState } from "react";
import { Table } from "rsuite";
import PropTypes from "prop-types";
import ImageCell from "./ImageCell";
import { tableSort } from "../../utils/helpers";

const { Column, HeaderCell, Cell } = Table;

const AdvancedStats = ({ isPitcher, data }) => {
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
          <HeaderCell>Walk Rate</HeaderCell>
          <Cell dataKey="walkrate" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>Strikeout Rate</HeaderCell>
          <Cell dataKey="krate" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>BB/K Ratio</HeaderCell>
          <Cell dataKey="bbkratio" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>Contact Rate</HeaderCell>
          <Cell dataKey="contactrate" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>BABIP</HeaderCell>
          <Cell dataKey="babip" />
        </Column>
      )}
      {!isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>Isolated Power</HeaderCell>
          <Cell dataKey="isopower" />
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
          <HeaderCell>IP</HeaderCell>
          <Cell dataKey="ip" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>K/9</HeaderCell>
          <Cell dataKey="kper9" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>BB/9</HeaderCell>
          <Cell dataKey="bbper9" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>K/BB</HeaderCell>
          <Cell dataKey="kbb" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>HR/9</HeaderCell>
          <Cell dataKey="hrper9" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>GB/FB</HeaderCell>
          <Cell dataKey="gbfbratio" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>Strand %</HeaderCell>
          <Cell dataKey="strandperc" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>Fastball</HeaderCell>
          <Cell dataKey="fastball" />
        </Column>
      )}
      {isPitcher && (
        <Column align="center" flexGrow={1} sortable>
          <HeaderCell>ERA</HeaderCell>
          <Cell dataKey="era" />
        </Column>
      )}
    </Table>
  );
};

AdvancedStats.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isPitcher: PropTypes.bool.isRequired,
};

export default AdvancedStats;
