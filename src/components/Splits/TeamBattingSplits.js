import React from "react";
import { Table } from "rsuite";
import PropTypes from "prop-types";
import LoadingSpinner from "../LoadingSpinner";

const { Column, HeaderCell, Cell } = Table;
const TeamBattingSplits = ({ dataList }) => {
  if (!dataList) {
    return <LoadingSpinner />;
  }

  return (
    <Table autoHeight data={dataList}>
      <Column flexGrow={1} align="center" sortable fixed>
        <HeaderCell>name</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>ab</HeaderCell>
        <Cell dataKey="ab" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>runs</HeaderCell>
        <Cell dataKey="runs" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>s</HeaderCell>
        <Cell dataKey="s" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>d</HeaderCell>
        <Cell dataKey="d" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>t</HeaderCell>
        <Cell dataKey="t" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>hr</HeaderCell>
        <Cell dataKey="hr" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>rbi</HeaderCell>
        <Cell dataKey="rbi" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>bb</HeaderCell>
        <Cell dataKey="bb" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>ibb</HeaderCell>
        <Cell dataKey="ibb" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>hbp</HeaderCell>
        <Cell dataKey="hbp" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>sb</HeaderCell>
        <Cell dataKey="sb" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>cs</HeaderCell>
        <Cell dataKey="cs" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>obp</HeaderCell>
        <Cell dataKey="obp" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>slg</HeaderCell>
        <Cell dataKey="slg" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>ops</HeaderCell>
        <Cell dataKey="ops" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>h</HeaderCell>
        <Cell dataKey="h" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
        <HeaderCell>ktotal</HeaderCell>
        <Cell dataKey="ktotal" />
      </Column>

      <Column flexGrow={1} align="center" sortable>
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
