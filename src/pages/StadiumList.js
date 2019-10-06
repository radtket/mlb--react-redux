import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStadiums } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";

const StadiumList = ({
  stadiumsFail,
  stadiumsLoading,
  stadiums,
  fetchStadiums: getStadiums,
}) => {
  useEffect(() => {
    getStadiums();
  }, []);
  if (stadiumsFail) {
    return <div>Error! {stadiumsFail.message}</div>;
  }

  if (stadiumsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ul>
      {stadiums &&
        stadiums.map(item => <li key={item.StadiumID}>{item.Name}</li>)}
    </ul>
  );
};

StadiumList.propTypes = {
  stadiumsFail: PropTypes.bool,
  stadiumsLoading: PropTypes.bool.isRequired,
  stadiums: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchStadiums: PropTypes.func.isRequired,
};

StadiumList.defaultProps = {
  stadiumsFail: null,
};

const mapStateToProps = ({ stadiums }) => ({
  stadiums: stadiums.stadiumsData,
  stadiumsLoading: stadiums.stadiumsLoading,
  stadiumsFail: stadiums.stadiumsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchStadiums,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(StadiumList);
