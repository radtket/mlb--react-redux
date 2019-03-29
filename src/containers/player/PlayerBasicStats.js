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
    const { playerStatsFail, playerStatsLoading, playerStats } = this.props;

    if (playerStatsFail) {
      return <div>Error! {playerStatsFail.message}</div>;
    }

    if (playerStatsLoading) {
      return <div>Loading...</div>;
    }

    const { isPitcher, basic } = playerStats;

    console.log(playerStats);


    return (
      <div>
        {basic && basic.body && (
          <Table
            autoHeight
            data={this.getData(basic.body)}
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
                <HeaderCell>R</HeaderCell>
                <Cell dataKey="r" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>H</HeaderCell>
                <Cell dataKey="h" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>XBH</HeaderCell>
                <Cell dataKey="xbh" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>2B</HeaderCell>
                <Cell dataKey="b2" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>3B</HeaderCell>
                <Cell dataKey="b3" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>HR</HeaderCell>
                <Cell dataKey="hr" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>RBI</HeaderCell>
                <Cell dataKey="rbi" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>SB</HeaderCell>
                <Cell dataKey="sb" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>CS</HeaderCell>
                <Cell dataKey="cs" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>BB</HeaderCell>
                <Cell dataKey="bb" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>SO</HeaderCell>
                <Cell dataKey="so" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>SH</HeaderCell>
                <Cell dataKey="sh" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>SF</HeaderCell>
                <Cell dataKey="sf" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>HBP</HeaderCell>
                <Cell dataKey="hbp" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>AVG</HeaderCell>
                <Cell dataKey="avg" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>OBP</HeaderCell>
                <Cell dataKey="obp" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>SLG</HeaderCell>
                <Cell dataKey="slg" />
              </Column>
            )}
            {!isPitcher && (
              <Column flexGrow={1} align="center" sortable>
                <HeaderCell>OPS</HeaderCell>
                <Cell dataKey="ops" />
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
        )}
      </div>
    );
  }
}

PlayerBasicStats.propTypes = {
  // data: PropTypes.arrayOf(PropTypes.object).isRequired,
  RotoWirePlayerID: PropTypes.number,
  PositionCategory: PropTypes.string,
  playerStatsFail: null || PropTypes.bool,
  playerStatsLoading: PropTypes.bool.isRequired,
  // playerStats: PropTypes.arrayOf(
  //   PropTypes.oneOfType(PropTypes.array, PropTypes.object)
  // ).isRequired,
  // playerStats: PropTypes.objectOf(
  //   PropTypes.oneOf([PropTypes.array, PropTypes.object,])
  // ).isRequired,
  playerStats: PropTypes.shape({
    isPitcher: PropTypes.bool,
    advanced: PropTypes.shape({
      body: PropTypes.array,
      footer: PropTypes.array,
    }),
    basic: PropTypes.shape({ body: PropTypes.array, footer: PropTypes.array }),
    defensive: PropTypes.arrayOf(PropTypes.object),
    gamelog: PropTypes.shape({
      majors: PropTypes.object,
      minors: PropTypes.object,
    }),
    gamesByPos: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  fetchPlayerStats: PropTypes.func.isRequired,
};

PlayerBasicStats.defaultProps = {
  playerStatsFail: null,
  RotoWirePlayerID: null,
  PositionCategory: "",
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
