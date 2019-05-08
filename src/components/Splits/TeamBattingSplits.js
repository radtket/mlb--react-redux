import React, { useState, useEffect, useRef } from "react";
import { Table } from "rsuite";
import PropTypes from "prop-types";
import LoadingSpinner from "../LoadingSpinner";

const { Column, HeaderCell, Cell } = Table;

const TeamBattingSplits = ({ dataList: PropsData }) => {
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

  if (!PropsData) {
    return <LoadingSpinner />;
  }

  return (
    <Table
      autoHeight
      data={getData(data)}
      loading={loading}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      rowClassName="capitalize-first-cell">
      <Column align="left" width={200} sortable fixed>
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
