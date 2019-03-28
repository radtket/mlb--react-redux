/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table } from "rsuite";
import { fetchPlayerStats } from "../../modules/playerStats/actions";
import ImageCell from "./ImageCell";

const { Column, HeaderCell, Cell } = Table;

class PlayerBasicStats extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    const {
      fetchPlayerStats: getPlayerStats,
      RotoWirePlayerID,
      PositionCategory,
      playerStats: data,
    } = this.props;
    getPlayerStats(RotoWirePlayerID, PositionCategory);
    this.setState({
      data,
    });
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
    const { sortColumn, sortType, loading } = this.state;
    const { PositionCategory } = this.props;
    const { playerStatsFail, playerStatsLoading, playerStats } = this.props;

    if (playerStatsFail) {
      return <div>Error! {playerStatsFail.message}</div>;
    }

    if (playerStatsLoading) {
      return <div>Loading...</div>;
    }

    const pitcher = PositionCategory === "P";
    const batter = !pitcher;
    return (
      <div>
        <Table
          autoHeight
          data={this.getData(playerStats)}
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
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>PA</HeaderCell>
              <Cell dataKey="pa" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>AB</HeaderCell>
              <Cell dataKey="ab" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>R</HeaderCell>
              <Cell dataKey="r" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>H</HeaderCell>
              <Cell dataKey="h" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>XBH</HeaderCell>
              <Cell dataKey="xbh" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>2B</HeaderCell>
              <Cell dataKey="b2" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>3B</HeaderCell>
              <Cell dataKey="b3" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>HR</HeaderCell>
              <Cell dataKey="hr" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>RBI</HeaderCell>
              <Cell dataKey="rbi" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>SB</HeaderCell>
              <Cell dataKey="sb" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>CS</HeaderCell>
              <Cell dataKey="cs" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>BB</HeaderCell>
              <Cell dataKey="bb" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>SO</HeaderCell>
              <Cell dataKey="so" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>SH</HeaderCell>
              <Cell dataKey="sh" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>SF</HeaderCell>
              <Cell dataKey="sf" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>HBP</HeaderCell>
              <Cell dataKey="hbp" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>AVG</HeaderCell>
              <Cell dataKey="avg" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>OBP</HeaderCell>
              <Cell dataKey="obp" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>SLG</HeaderCell>
              <Cell dataKey="slg" />
            </Column>
          )}
          {batter && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>OPS</HeaderCell>
              <Cell dataKey="ops" />
            </Column>
          )}

          {pitcher && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>GS</HeaderCell>
              <Cell dataKey="gs" />
            </Column>
          )}
          {pitcher && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>sh</HeaderCell>
              <Cell dataKey="sh" />
            </Column>
          )}
          {pitcher && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>ip</HeaderCell>
              <Cell dataKey="ip" />
            </Column>
          )}
          {pitcher && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>H</HeaderCell>
              <Cell dataKey="h" />
            </Column>
          )}
          {pitcher && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>er</HeaderCell>
              <Cell dataKey="er" />
            </Column>
          )}
          {pitcher && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>hr</HeaderCell>
              <Cell dataKey="hr" />
            </Column>
          )}
          {pitcher && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>k</HeaderCell>
              <Cell dataKey="k" />
            </Column>
          )}
          {pitcher && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>bb</HeaderCell>
              <Cell dataKey="bb" />
            </Column>
          )}
          {pitcher && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>w</HeaderCell>
              <Cell dataKey="w" />
            </Column>
          )}
          {pitcher && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>l</HeaderCell>
              <Cell dataKey="l" />
            </Column>
          )}
          {pitcher && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>sv</HeaderCell>
              <Cell dataKey="sv" />
            </Column>
          )}
          {pitcher && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>bs</HeaderCell>
              <Cell dataKey="bs" />
            </Column>
          )}
          {pitcher && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>hld</HeaderCell>
              <Cell dataKey="hld" />
            </Column>
          )}
          {pitcher && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>era</HeaderCell>
              <Cell dataKey="era" />
            </Column>
          )}
          {pitcher && (
            <Column flexGrow={1} align="center" sortable>
              <HeaderCell>whip</HeaderCell>
              <Cell dataKey="whip" />
            </Column>
          )}
        </Table>
      </div>
    );
  }
}

PlayerBasicStats.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  RotoWirePlayerID: PropTypes.number.isRequired,
  PositionCategory: PropTypes.string.isRequired,
};

PlayerBasicStats.propTypes = {
  playerStatsFail: null || PropTypes.bool,
  playerStatsLoading: PropTypes.bool.isRequired,
  playerStats: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  ).isRequired,
  fetchPlayerStats: PropTypes.func.isRequired,
};

PlayerBasicStats.defaultProps = {
  playerStatsFail: null,
};

const mapStateToProps = ({ playerStats }) => ({
  playerStats: playerStats.playerStatsData,
  playerStatsLoading: playerStats.playerStatsLoading,
  playerStatsFail: playerStats.playerStatsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPlayerStats,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(PlayerBasicStats);
