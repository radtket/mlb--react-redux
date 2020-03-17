/* eslint-disable camelcase */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeamSplits } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import { monthList } from "../utils/helpers";

import { TeamBattingSplits, TeamPitchingSplits } from "../components/Splits";

const TeamSplitsList = ({ TeamArg }) => {
  const dispatch = useDispatch();

  const { teamSplitsData, teamSplitsLoading, teamSplitsError } = useSelector(
    state => state.teamSplits
  );

  useEffect(() => {
    dispatch(fetchTeamSplits(TeamArg));
  }, [TeamArg, dispatch]);

  if (teamSplitsError) {
    return <div>Error! {teamSplitsError.message}</div>;
  }

  if (teamSplitsLoading) {
    return <LoadingSpinner />;
  }

  const defaultHittingCategories = ({
    ab = 0,
    runs = 0,
    s = 0,
    d = 0,
    t = 0,
    hr = 0,
    rbi = 0,
    bb = 0,
    ibb = 0,
    hbp = 0,
    sb = 0,
    cs = 0,
    obp = 0,
    slg = 0,
    ops = 0,
    h = 0,
    ktotal = 0,
    avg = 0,
  }) => ({
    ab,
    runs,
    s,
    d,
    t,
    hr,
    rbi,
    bb,
    ibb,
    hbp,
    sb,
    cs,
    obp,
    slg,
    ops,
    h,
    ktotal,
    avg,
  });

  const defaultPitchingCategories = ({
    win = 0,
    loss = 0,
    save = 0,
    svo = 0,
    start = 0,
    play = 0,
    complete = 0,
    team_win = 0,
    team_loss = 0,
    ip_1 = 0,
    ip_2 = 0,
    h = 0,
    runs = 0,
    er = 0,
    hr = 0,
    bb = 0,
    ibb = 0,
    oba = 0,
    era = 0,
    ktotal = 0,
    s = 0,
    d = 0,
    t = 0,
    rbi = 0,
    hbp = 0,
    sb = 0,
    cs = 0,
    obp = 0,
    slg = 0,
    ops = 0,
    bf = 0,
  }) => ({
    win,
    loss,
    save,
    svo,
    start,
    play,
    complete,
    team_win,
    team_loss,
    ip_1,
    ip_2,
    h,
    runs,
    er,
    hr,
    bb,
    ibb,
    oba,
    era,
    ktotal,
    s,
    d,
    t,
    rbi,
    hbp,
    sb,
    cs,
    obp,
    slg,
    ops,
    bf,
  });

  const tableReduce = (a, o) => {
    a.push({
      name: o.value || o.name,
      ...defaultHittingCategories(o),
      ...defaultPitchingCategories(o),
    });
    return a;
  };

  const organizeSplits = data => {
    return Object.entries(data).reduce((all, one) => {
      const [ParentKey, ParentData] = one;

      if (ParentKey !== "month" && ParentKey !== "total") {
        all.push(...ParentData.reduce(tableReduce, []));
      }

      if (ParentKey === "month") {
        all.push(
          ...ParentData.reduce((a, o) => {
            a.push({
              name: monthList[o.value],
              ...defaultHittingCategories(o),
              ...defaultPitchingCategories(o),
            });
            return a;
          }, [])
        );
      }

      return all;
    }, []);
  };

  const { hitting, pitching } = teamSplitsData;

  return (
    <div className="container">
      {hitting && <TeamBattingSplits dataList={organizeSplits(hitting)} />}
      {pitching && <TeamPitchingSplits dataList={organizeSplits(pitching)} />}
    </div>
  );
};

TeamSplitsList.propTypes = {
  TeamArg: PropTypes.string,
};

TeamSplitsList.defaultProps = {
  TeamArg: "MIL",
};

export default TeamSplitsList;
