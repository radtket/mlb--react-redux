import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStadiums } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import { isArrayEmpty } from "../utils/helpers";
import ErrorMessage from "../components/ErrorMessage";

const StadiumList = () => {
  const dispatch = useDispatch();

  const { stadiumsData, stadiumsLoading, stadiumsError } = useSelector(
    state => state.stadiums
  );

  useEffect(() => {
    dispatch(fetchStadiums());
  }, [dispatch]);

  if (stadiumsError) {
    return <ErrorMessage error={stadiumsError} />;
  }

  if (stadiumsLoading) {
    return <LoadingSpinner />;
  }

  if (isArrayEmpty(stadiumsData)) {
    return <h1>No Stadiums Found</h1>;
  }

  return (
    <ul>
      {stadiumsData.map(item => (
        <li key={item.StadiumID}>{item.Name}</li>
      ))}
    </ul>
  );
};

export default StadiumList;
