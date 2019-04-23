/* eslint-disable no-console */
import { format, startOfWeek, addDays, endOfWeek } from "date-fns";

export const getInitalActiveIndex = (activeGames, activeTab) => {
  console.log("getInitalActiveIndex");
  return activeGames.findIndex(child => {
    const { label } = child.props;
    const activeDayStartOfWeek = format(startOfWeek(activeTab), "YYYY-MM-DD");
    return activeDayStartOfWeek === label;
  });
};

export const buildEmptyCalender = startAndEndDayArg => {
  console.log("buildEmptyCalender");
  const { firstDay, lastDay } = startAndEndDayArg;
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
  const firstDay = schedules[0] && schedules[0].Day;
  const lastDay =
    schedules[schedules.length - 1] && schedules[schedules.length - 1].Day;
  return {
    firstDay: startOfWeek(firstDay),
    lastDay: endOfWeek(lastDay),
  };
};

export const renderVisibleStartAndStopDays = (activeGames, dayIndex) => {
  const day = activeGames[dayIndex] && activeGames[dayIndex].key;
  const weekStart = format(startOfWeek(day), "MMMM Do, YYYY");
  const weekEnd = format(endOfWeek(day), "MMMM Do, YYYY");
  return `${weekStart} - ${weekEnd}`;
};
