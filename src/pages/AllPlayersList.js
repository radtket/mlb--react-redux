import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllPlayers } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";

const AllPlayerList = ({
  allPlayersFail,
  allPlayersLoading,
  allPlayers,
  fetchAllPlayers: getAllPlayers,
}) => {
  useEffect(() => {
    getAllPlayers();
  }, []);
  if (allPlayersFail) {
    return <div>Error! {allPlayersFail.message}</div>;
  }

  if (allPlayersLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ul>
      {allPlayers &&
        allPlayers.map(item => <li key={item.PlayerID}>{item.Name}</li>)}
    </ul>
  );
};

AllPlayerList.propTypes = {
  allPlayersFail: null || PropTypes.bool,
  allPlayersLoading: PropTypes.bool.isRequired,
  allPlayers: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAllPlayers: PropTypes.func.isRequired,
};

AllPlayerList.defaultProps = {
  allPlayersFail: null,
};

const mapStateToProps = ({ allPlayers }) => ({
  allPlayers: allPlayers.allPlayersData,
  allPlayersLoading: allPlayers.allPlayersLoading,
  allPlayersFail: allPlayers.allPlayersError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllPlayers,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(AllPlayerList);
