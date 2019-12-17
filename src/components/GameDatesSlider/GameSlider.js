/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { TodaysDate, isArrayEmpty, isObjectEmpty } from "../../utils/helpers";
import LoadingSpinner from "../LoadingSpinner";
import SlickPrevArrow from "./SlickPrevArrow";
import SlickNextArrow from "./SlickNextArrow";
import GamesBody from "./GamesBody";
import buildGamesCalander from "./buildGamesCalander";
import GameSliderButton from "./GameSliderButton";
import {
  buildEmptyCalender,
  getInitalActiveIndex,
  getStartAndEndDays,
  renderVisibleStartAndStopDays,
} from "./helpers";

const GameSlider = ({ schedules }) => {
  const slider = useRef();

  const [activeDisplayDate, setActiveDisplayDate] = useState(null);
  const [activeGames, setActiveGames] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(TodaysDate);
  const [startAndEndDay, setStartAndEndDay] = useState({});

  useEffect(() => {
    console.log("ran useEffect");
    isObjectEmpty(startAndEndDay) &&
      setStartAndEndDay(getStartAndEndDays(schedules));

    isArrayEmpty(activeGames) &&
      !isObjectEmpty(startAndEndDay) &&
      !isArrayEmpty(schedules) &&
      setActiveGames(
        buildGamesCalander(schedules, buildEmptyCalender(startAndEndDay))
      );

    !isArrayEmpty(activeGames) &&
      !isObjectEmpty(startAndEndDay) &&
      activeIndex === null &&
      setActiveIndex(getInitalActiveIndex(activeGames, activeTab));

    !isArrayEmpty(activeGames) &&
      !isObjectEmpty(startAndEndDay) &&
      activeDisplayDate === null &&
      activeIndex &&
      setActiveDisplayDate(activeIndex);
  });

  const GamesNav = () => {
    console.log("GamesNav");
    return activeGames.map(child => {
      const { label } = child.props;
      return (
        <GameSliderButton
          key={label}
          activeTab={activeTab}
          label={label}
          setActiveTab={setActiveTab}
        />
      );
    });
  };

  if (
    isObjectEmpty(startAndEndDay) ||
    isArrayEmpty(activeGames) ||
    activeIndex === null
  ) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h1>{renderVisibleStartAndStopDays(activeGames, activeDisplayDate)}</h1>
      <Slider
        ref={slider}
        className="text-center"
        {...{
          infinite: false,
          speed: 500,
          slidesToShow: 7,
          slidesToScroll: 7,
          initialSlide: activeIndex,
          afterChange: current => setActiveDisplayDate(current),
          nextArrow: <SlickNextArrow />,
          prevArrow: <SlickPrevArrow />,
        }}>
        {GamesNav()}
      </Slider>
      {GamesBody(activeGames, activeTab)}
    </>
  );
};

GameSlider.propTypes = {
  schedules: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GameSlider;
