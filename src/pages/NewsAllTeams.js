import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewsAllTeams } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import Marquee from "../components/Marquee";
import PageTitle from "../components/PageTitle";
import NewsArticleGrid from "../components/NewsArticleGrid";
import ErrorMessage from "../components/ErrorMessage";

const NewsAllTeamsList = () => {
  const dispatch = useDispatch();

  const { newsAllTeamsData, newsAllLoading, newsAllError } = useSelector(
    state => state.newsAllTeams
  );

  useEffect(() => {
    // TODO: Add When API is Live
    // dispatch(fetchNewsAllTeams(new Date()));
    dispatch(fetchNewsAllTeams(new Date("2018-05-04T00:00:00")));
  }, [dispatch]);

  if (newsAllError) {
    return <ErrorMessage error={newsAllError} />;
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

export default NewsAllTeamsList;
