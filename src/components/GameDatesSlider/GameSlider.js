/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { TodaysDate, isObjectEmpty } from "../../utils/helpers";
import LoadingSpinner from "../LoadingSpinner";
import SlickArrow from "./SlickArrow";
import GamesBody from "./GamesBody";
import GameSliderButton from "./GameSliderButton";
import {
  buildEmptyCalender,
  getInitalActiveIndex,
  getStartAndEndDays,
  combineGamesCalander,
} from "./helpers";
import { ChevronRight, ChevronLeft } from "../Icons";
import VisibleStartAndStopDays from "./VisibleStartAndStopDays";

const GameSlider = ({ schedules }) => {
  const slider = useRef();
  const [activeDisplayDate, setActiveDisplayDate] = useState(null);
  const [activeTab, setActiveTab] = useState("2019-04-25" || TodaysDate);

  const startAndEndDay = getStartAndEndDays(schedules);
  const activeGames = combineGamesCalander(
    schedules,
    buildEmptyCalender(startAndEndDay)
  );

  const activeIndex = getInitalActiveIndex(activeGames, activeTab);

  useEffect(() => {
    console.log("ran useEffect");
    setActiveDisplayDate(activeIndex);
  }, [activeIndex]);

  if (
    isObjectEmpty(startAndEndDay) ||
    isObjectEmpty(activeGames) ||
    activeIndex === null
  ) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <VisibleStartAndStopDays {...{ activeTab }} />
      <Slider
        ref={slider}
        className="text-center"
        {...{
          infinite: false,
          speed: 500,
          slidesToShow: 7,
          slidesToScroll: 7,
          initialSlide: activeIndex,
          afterChange: current => {
            console.log({ current });
            setActiveDisplayDate(current);
          },
          nextArrow: (
            <SlickArrow>
              <ChevronRight />
            </SlickArrow>
          ),
          prevArrow: (
            <SlickArrow>
              <ChevronLeft />
            </SlickArrow>
          ),
        }}
      >
        {/* Games Nav */}
        {Object.keys(activeGames).map(label => {
          return (
            <GameSliderButton
              {...{ activeTab, label, setActiveTab, key: label }}
            />
          );
        })}
      </Slider>
      <GamesBody
        {...{ dispayedGames: activeGames && activeGames[activeTab] }}
      />
    </>
  );
};

GameSlider.propTypes = {
  schedules: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GameSlider;
