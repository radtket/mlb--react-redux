import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeamSplits } from "../../../modules/actions";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { monthList, capitalizeFirstLetter } from "../../../utils/helpers";

import {
  TeamBattingSplits,
  TeamPitchingSplits,
} from "../../../components/Splits";
import Card from "../../../components/Card";
import ErrorMessage from "../../../components/ErrorMessage";

const PageTeamSplits = ({ Key }) => {
  const dispatch = useDispatch();

  const { teamSplitsData, teamSplitsLoading, teamSplitsError } = useSelector(
    state => state.teamSplitsData
  );

  useEffect(() => {
    dispatch(fetchTeamSplits(Key));
  }, [Key, dispatch]);

  if (teamSplitsError) {
    return <ErrorMessage error={teamSplitsError} />;
  }

  if (teamSplitsLoading) {
    return <LoadingSpinner />;
  }

  const defaultHittingCategories = o => ({
    ab: o.ab || 0,
    runs: o.runs || 0,
    s: o.s || 0,
    d: o.d || 0,
    t: o.t || 0,
    hr: o.hr || 0,
    rbi: o.rbi || 0,
    bb: o.bb || 0,
    ibb: o.ibb || 0,
    hbp: o.hbp || 0,
    sb: o.sb || 0,
    cs: o.cs || 0,
    obp: o.obp || 0,
    slg: o.slg || 0,
    ops: o.ops || 0,
    h: o.h || 0,
    ktotal: o.ktotal || 0,
    avg: o.avg || 0,
  });

  const defaultPitchingCategories = o => ({
    win: o.win || 0,
    loss: o.loss || 0,
    save: o.save || 0,
    svo: o.svo || 0,
    start: o.start || 0,
    play: o.play || 0,
    complete: o.complete || 0,
    team_win: o.team_win || 0,
    team_loss: o.team_loss || 0,
    ip_1: o.ip_1 || 0,
    ip_2: o.ip_2 || 0,
    h: o.h || 0,
    runs: o.runs || 0,
    er: o.er || 0,
    hr: o.hr || 0,
    bb: o.bb || 0,
    ibb: o.ibb || 0,
    oba: o.oba || 0,
    era: o.era || 0,
    ktotal: o.ktotal || 0,
    s: o.s || 0,
    d: o.d || 0,
    t: o.t || 0,
    rbi: o.rbi || 0,
    hbp: o.hbp || 0,
    sb: o.sb || 0,
    cs: o.cs || 0,
    obp: o.obp || 0,
    slg: o.slg || 0,
    ops: o.ops || 0,
    bf: o.bf || 0,
  });

  const capitalizeKeyName = name => {
    if (!name.includes("_")) {
      return capitalizeFirstLetter(name);
    }
    const splitName = name.split("_").map(word => capitalizeFirstLetter(word));
    splitName[0] = `${splitName[0]} vs`;
    return splitName.join(" ");
  };

  const organizeSplits = data => {
    return Object.entries(data).reduce((all, one, index) => {
      const [ParentKey, ParentData] = one;

      if (ParentKey !== "total") {
        all.push({
          id: index,
          name:
            ParentKey === "pitcher_hand"
              ? "Pitcher Hand"
              : capitalizeKeyName(ParentKey),
          children: ParentData.map((child, i) => {
            return {
              id: `${index}-${i}`,
              name:
                ParentKey === "month"
                  ? monthList[child.value]
                  : child.value || child.name,
              ...defaultHittingCategories(child),
              ...defaultPitchingCategories(child),
            };
          }),
        });
      }

      return all;
    }, []);
  };

  const { hitting, pitching } = teamSplitsData;

  return (
    <div className="container">
      {hitting && (
        <Card
          body={<TeamBattingSplits dataList={organizeSplits(hitting)} />}
          title="Hitting Splits"
        />
      )}
      {pitching && (
        <Card
          body={<TeamPitchingSplits dataList={organizeSplits(pitching)} />}
          title="Pitching Splits"
        />
      )}
    </div>
  );
};

PageTeamSplits.propTypes = {
  Key: PropTypes.string.isRequired,
};

export default PageTeamSplits;
