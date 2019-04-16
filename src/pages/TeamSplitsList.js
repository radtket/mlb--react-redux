import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTeamSplits } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import { monthList } from "../utils/helpers";
import TeamBattingSplits from "./TeamBattingSplits";

const TeamSplitsList = ({
  teamSplitsFail,
  teamSplitsLoading,
  teamSplits,
  fetchTeamSplits: getTeamSplits,
}) => {
  useEffect(() => {
    getTeamSplits("MIL");
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

  const tableReduce = (a, o) => {
    a.push({
      name: o.value || o.name,
      ...defaultHittingCategories(o),
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
    </div>
  );
};

TeamSplitsList.propTypes = {
  teamSplitsFail: null || PropTypes.bool,
  teamSplitsLoading: PropTypes.bool.isRequired,
  teamSplits: PropTypes.objectOf(PropTypes.object).isRequired,
  fetchTeamSplits: PropTypes.func.isRequired,
};

TeamSplitsList.defaultProps = {
  teamSplitsFail: null,
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
