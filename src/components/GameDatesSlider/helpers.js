/* eslint-disable no-console */
import { format, startOfWeek, addDays, endOfWeek } from "date-fns";
import { isArrayEmpty } from "../../utils/helpers";

export const getInitalActiveIndex = (activeGames, activeTab) =>
  Object.keys(activeGames).findIndex(
    key => key === format(startOfWeek(activeTab), "YYYY-MM-DD")
  );

export const buildEmptyCalender = ({ firstDay, lastDay }) => {
  console.log("buildEmptyCalender");

  let day = firstDay;
  const allDays = {};
  while (day <= lastDay) {
    for (let i = 0; i < 7; i += 1) {
      const formatedDate = format(day, "YYYY-MM-DD");
      allDays[formatedDate] = allDays[formatedDate] || [];
      day = addDays(day, 1);
    }
  }

  return allDays;
};

export const getStartAndEndDays = schedules => {
  console.log("ran getStartAndEndDays");
  if (isArrayEmpty(schedules)) {
    return {
      firstDay: "",
      lastDay: "",
    };
  }
  const [first, ...rest] = schedules;
  const { length, [length - 1]: last } = rest;

  return {
    firstDay: startOfWeek(first.Day),
    lastDay: endOfWeek(last.Day),
  };
};

export const combineGamesCalander = (schedules, emptyCalender) =>
  schedules.reduce((all, one) => {
    const allGames = all;
    // ! FantanySportsAPI = one.Day
    // ! SportsRadar = one.scheduled
    // const Day = format(new Date(one.Day), "YYYY-MM-DD");
    const Day = format(new Date(one.scheduled), "YYYY-MM-DD");
    allGames[Day] = allGames[Day] || [];
    allGames[Day].push(one);
    return allGames;
  }, emptyCalender);
