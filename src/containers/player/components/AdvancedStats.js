import React, { Component } from "react";
import { Table } from "rsuite";
import PropTypes from "prop-types";
import ImageCell from "./ImageCell";

const { Column, HeaderCell, Cell } = Table;

class AdvancedStats extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      data,
    });
  }

  componentDidUpdate(prevProps) {
    const { playerId, data } = this.props;
    const { playerId: prevPlayerId } = prevProps;

    if (playerId !== prevPlayerId) {
      this.setState({
        data,
      });
    }
  }

  getData = data => {
    const { sortColumn, sortType } = this.state;
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
    const { sortColumn, sortType, loading, data } = this.state;
    const { isPitcher } = this.props;

    return (
      <Table
        autoHeight
        data={this.getData(data)}
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
            <HeaderCell>Walk Rate</HeaderCell>
            <Cell dataKey="walkrate" />
          </Column>
        )}
        {!isPitcher && (
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>Strikeout Rate</HeaderCell>
            <Cell dataKey="krate" />
          </Column>
        )}
        {!isPitcher && (
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>BB/K Ratio</HeaderCell>
            <Cell dataKey="bbkratio" />
          </Column>
        )}
        {!isPitcher && (
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>Contact Rate</HeaderCell>
            <Cell dataKey="contactrate" />
          </Column>
        )}
        {!isPitcher && (
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>BABIP</HeaderCell>
            <Cell dataKey="babip" />
          </Column>
        )}
        {!isPitcher && (
          <Column flexGrow={1} align="center" sortable>
            <HeaderCell>Isolated Power</HeaderCell>
            <Cell dataKey="isopower" />
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
  }
}

AdvancedStats.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  playerId: PropTypes.number.isRequired,
  isPitcher: PropTypes.bool.isRequired,
};

export default AdvancedStats;
