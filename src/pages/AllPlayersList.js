import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPlayers } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";

const AllPlayerList = () => {
  const dispatch = useDispatch();

  const { allPlayersData, allPlayersLoading, allPlayersError } = useSelector(
    state => state.allPlayers
  );

  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, [dispatch]);

  if (allPlayersError) {
    return <div>Error! {allPlayersError.message}</div>;
  }

  if (allPlayersLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ul>
      {allPlayersData.map(item => (
        <li key={item.PlayerID}>{item.Name}</li>
      ))}
    </ul>
  );
};

export default AllPlayerList;
