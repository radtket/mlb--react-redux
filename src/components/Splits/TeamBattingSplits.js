import React, { useState } from "react";
import { Table } from "rsuite";
import PropTypes from "prop-types";
import LoadingSpinner from "../LoadingSpinner";
import { tableSort } from "../../utils/helpers";

const { Column, HeaderCell, Cell } = Table;

const TeamBattingSplits = ({ dataList }) => {
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

  const data = getData(dataList);

  if (!dataList) {
    return <LoadingSpinner />;
  }

  return (
    <Table
      autoHeight
      {...{ data, loading, sortType, sortColumn }}
      isTree
      onSortColumn={handleSortColumn}
      rowClassName="capitalize-first-cell"
      rowKey="id"
    >
      <Column align="left" fixed sortable width={200}>
        <HeaderCell>name</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>ab</HeaderCell>
        <Cell dataKey="ab" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>runs</HeaderCell>
        <Cell dataKey="runs" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>s</HeaderCell>
        <Cell dataKey="s" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>d</HeaderCell>
        <Cell dataKey="d" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>t</HeaderCell>
        <Cell dataKey="t" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>hr</HeaderCell>
        <Cell dataKey="hr" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>rbi</HeaderCell>
        <Cell dataKey="rbi" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>bb</HeaderCell>
        <Cell dataKey="bb" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>ibb</HeaderCell>
        <Cell dataKey="ibb" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>hbp</HeaderCell>
        <Cell dataKey="hbp" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>sb</HeaderCell>
        <Cell dataKey="sb" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>cs</HeaderCell>
        <Cell dataKey="cs" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>obp</HeaderCell>
        <Cell dataKey="obp" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>slg</HeaderCell>
        <Cell dataKey="slg" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>ops</HeaderCell>
        <Cell dataKey="ops" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>h</HeaderCell>
        <Cell dataKey="h" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>ktotal</HeaderCell>
        <Cell dataKey="ktotal" />
      </Column>

      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>avg</HeaderCell>
        <Cell dataKey="avg" />
      </Column>
    </Table>
  );
};

TeamBattingSplits.propTypes = {
  dataList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TeamBattingSplits;
