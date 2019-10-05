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
      isTree
      loading={loading}
      onSortColumn={handleSortColumn}
      rowClassName="capitalize-first-cell"
      rowKey="id"
      sortColumn={sortColumn}
      sortType={sortType}>
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
