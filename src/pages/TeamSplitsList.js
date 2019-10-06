import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTeamSplits } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import { monthList } from "../utils/helpers";

import { TeamBattingSplits, TeamPitchingSplits } from "../components/Splits";

const TeamSplitsList = ({
  teamSplitsFail,
  teamSplitsLoading,
  teamSplits,
  fetchTeamSplits: getTeamSplits,
  TeamArg,
}) => {
  useEffect(() => {
    getTeamSplits(TeamArg || "MIL");
  }, []);
  if (teamSplitsFail) {
    return <div>Error! {teamSplitsFail.message}</div>;
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

  const { hitting, pitching } = teamSplits;

  return (
    <div className="container">
      {hitting && <TeamBattingSplits dataList={organizeSplits(hitting)} />}
      {pitching && <TeamPitchingSplits dataList={organizeSplits(pitching)} />}
    </div>
  );
};

TeamSplitsList.propTypes = {
  teamSplitsFail: PropTypes.bool,
  teamSplitsLoading: PropTypes.bool.isRequired,
  teamSplits: PropTypes.objectOf(PropTypes.object).isRequired,
  fetchTeamSplits: PropTypes.func.isRequired,
  TeamArg: PropTypes.string,
};

TeamSplitsList.defaultProps = {
  teamSplitsFail: null,
  TeamArg: "MIL",
};

const mapStateToProps = ({ teamSplits }) => ({
  teamSplits: teamSplits.teamSplitsData,
  teamSplitsLoading: teamSplits.teamSplitsLoading,
  teamSplitsFail: teamSplits.teamSplitsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTeamSplits,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(TeamSplitsList);
