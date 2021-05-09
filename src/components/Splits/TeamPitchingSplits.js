import React, { useState } from "react";
import { Table } from "rsuite";
import PropTypes from "prop-types";
import LoadingSpinner from "../LoadingSpinner";
import { tableSort } from "../../utils/helpers";

const { Column, HeaderCell, Cell } = Table;

const TeamPitchingSplits = ({ dataList }) => {
  const [loading, setLoading] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortType, setSortType] = useState("asc");

  const handleSortColumn = (sortColumnArg, sortTypeArg) => {
    setLoading(true);

    setTimeout(() => {
      setSortType(sortTypeArg);
      setSortColumn(sortColumnArg);
      setLoading(false);
    }, 500);
  };

  const getData = dataArg => {
    if (sortColumn && sortType) {
      return dataArg.sort((a, b) => tableSort(a, b, sortType, sortColumn));
    }
    return dataArg;
  };

  const data = getData(dataList);

  if (!data) {
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
        <HeaderCell>win</HeaderCell>
        <Cell dataKey="win" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>loss</HeaderCell>
        <Cell dataKey="loss" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>save</HeaderCell>
        <Cell dataKey="save" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>svo</HeaderCell>
        <Cell dataKey="svo" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>start</HeaderCell>
        <Cell dataKey="start" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>play</HeaderCell>
        <Cell dataKey="play" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>complete</HeaderCell>
        <Cell dataKey="complete" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>team_win</HeaderCell>
        <Cell dataKey="team_win" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>team_loss</HeaderCell>
        <Cell dataKey="team_loss" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>ip_1</HeaderCell>
        <Cell dataKey="ip_1" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>ip_2</HeaderCell>
        <Cell dataKey="ip_2" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>h</HeaderCell>
        <Cell dataKey="h" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>runs</HeaderCell>
        <Cell dataKey="runs" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>er</HeaderCell>
        <Cell dataKey="er" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>hr</HeaderCell>
        <Cell dataKey="hr" />
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
        <HeaderCell>oba</HeaderCell>
        <Cell dataKey="oba" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>era</HeaderCell>
        <Cell dataKey="era" />
      </Column>
      <Column align="center" flexGrow={1} sortable>
        <HeaderCell>ktotal</HeaderCell>
        <Cell dataKey="ktotal" />
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
        <HeaderCell>rbi</HeaderCell>
        <Cell dataKey="rbi" />
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
        <HeaderCell>bf</HeaderCell>
        <Cell dataKey="bf" />
      </Column>
    </Table>
  );
};

TeamPitchingSplits.propTypes = {
  dataList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TeamPitchingSplits;
