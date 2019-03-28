/* eslint-disable camelcase */
import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Table } from "rsuite";
import ImageCell from "./ImageCell";

const { Column, HeaderCell, Cell } = Table;

class PitcherStats extends Component {
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
            <HeaderCell>GS</HeaderCell>
            <Cell dataKey="gs" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>sh</HeaderCell>
            <Cell dataKey="sh" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>ip</HeaderCell>
            <Cell dataKey="ip" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>H</HeaderCell>
            <Cell dataKey="h" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>er</HeaderCell>
            <Cell dataKey="er" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>hr</HeaderCell>
            <Cell dataKey="hr" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>k</HeaderCell>
            <Cell dataKey="k" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>bb</HeaderCell>
            <Cell dataKey="bb" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>w</HeaderCell>
            <Cell dataKey="w" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>l</HeaderCell>
            <Cell dataKey="l" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>sv</HeaderCell>
            <Cell dataKey="sv" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>bs</HeaderCell>
            <Cell dataKey="bs" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>hld</HeaderCell>
            <Cell dataKey="hld" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>era</HeaderCell>
            <Cell dataKey="era" />
          </Column>
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>whip</HeaderCell>
            <Cell dataKey="whip" />
          </Column>
        </Table>
      </div>
    );
  }
}

PitcherStats.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  RotoWirePlayerID: PropTypes.number.isRequired,
};

export default PitcherStats;
