import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewsAllTeams } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import Marquee from "../components/Marquee";
import PageTitle from "../components/PageTitle";
import NewsArticleGrid from "../components/NewsArticleGrid";

const NewsAllTeamsList = () => {
  const dispatch = useDispatch();

  const { newsAllTeamsData, newsAllLoading, newsAllError } = useSelector(
    state => state.allPlayers
  );

  useEffect(() => {
    // TODO: Add When API is Live
    // dispatch(fetchNewsAllTeams(new Date()));
    dispatch(fetchNewsAllTeams(new Date("2018-05-04T00:00:00")));
  }, [dispatch]);

  if (newsAllError) {
    return <div>Error! {newsAllError.message}</div>;
  }

  if (newsAllLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Marquee MarqueeData={newsAllTeamsData} MarqueeItems="2" />
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <PageTitle title="News" />
          </div>
        </div>
      </div>
      <NewsArticleGrid {...{ newsAllTeams: newsAllTeamsData }} />
    </>
  );
};

NewsAllTeamsList.propTypes = {
  newsAllError: PropTypes.bool,
  newsAllLoading: PropTypes.bool.isRequired,
  newsAllTeams: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchNewsAllTeams: PropTypes.func.isRequired,
};

NewsAllTeamsList.defaultProps = {
  newsAllError: null,
};

export default NewsAllTeamsList;
