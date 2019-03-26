/* eslint-disable camelcase */
import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Table } from "rsuite";
import ImageCell from "./ImageCell";

const { Column, HeaderCell, Cell } = Table;

class BatterStats extends Component {
  state = {
    data: [],
    RotoWirePlayerID: "",
  };

  componentDidMount() {
    const { data, RotoWirePlayerID } = this.props;

    this.setState({
      data,
      RotoWirePlayerID,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, RotoWirePlayerID: ThisRotoWirePlayerID } = this.state;
    const { RotoWirePlayerID: PrevRotoWirePlayerID } = prevState;

    if (PrevRotoWirePlayerID !== ThisRotoWirePlayerID) {
      this.setState({
        data,
        RotoWirePlayerID: ThisRotoWirePlayerID,
      });
      this.getData();
    }
  }

  getData = () => {
    const { data, sortColumn, sortType } = this.state;

    if (sortColumn && sortType) {
      return data.sort((a, b) => {
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
    return data;
  };

  handleSortColumn = (sortColumn, sortType) => {
    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.setState({
        sortColumn,
        sortType,
        loading: false,
      });
    }, 500);
  };

  render() {
    const { sortColumn, sortType, loading } = this.state;
    return (
      <div>
        <Table
          autoHeight
          data={this.getData()}
          onRowClick={e => {
            console.log(e);
          }}
          loading={loading}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={this.handleSortColumn}>
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
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>PA</HeaderCell>
            <Cell dataKey="pa" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>AB</HeaderCell>
            <Cell dataKey="ab" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>R</HeaderCell>
            <Cell dataKey="r" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>H</HeaderCell>
            <Cell dataKey="h" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>XBH</HeaderCell>
            <Cell dataKey="xbh" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>2B</HeaderCell>
            <Cell dataKey="b2" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>3B</HeaderCell>
            <Cell dataKey="b3" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>HR</HeaderCell>
            <Cell dataKey="hr" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>RBI</HeaderCell>
            <Cell dataKey="rbi" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>SB</HeaderCell>
            <Cell dataKey="sb" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>CS</HeaderCell>
            <Cell dataKey="cs" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>BB</HeaderCell>
            <Cell dataKey="bb" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>SO</HeaderCell>
            <Cell dataKey="so" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>SH</HeaderCell>
            <Cell dataKey="sh" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>SF</HeaderCell>
            <Cell dataKey="sf" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>HBP</HeaderCell>
            <Cell dataKey="hbp" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>AVG</HeaderCell>
            <Cell dataKey="avg" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>OBP</HeaderCell>
            <Cell dataKey="obp" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>SLG</HeaderCell>
            <Cell dataKey="slg" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>OPS</HeaderCell>
            <Cell dataKey="ops" />
          </Column>
        </Table>
      </div>
    );
  }
}

BatterStats.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  RotoWirePlayerID: PropTypes.number.isRequired,
};

export default BatterStats;
