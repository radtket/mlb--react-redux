import { format, startOfWeek, addDays, endOfWeek } from "date-fns";
import { isArrayEmpty } from "../../utils/helpers";

export const getInitalActiveIndex = (activeGames, activeTab) =>
  Object.keys(activeGames).findIndex(
    key => key === format(startOfWeek(activeTab), "YYYY-MM-DD")
  );

export const buildEmptyCalender = schedules => {
  if (isArrayEmpty(schedules)) {
    return {};
  }

  const [first, ...rest] = schedules;
  const { length, [length - 1]: last } = rest;

  // ! FantanySportsAPI = item.Day
  // ! SportsRadar = item.scheduled
  const firstDay = startOfWeek(first.scheduled);
  const lastDay = endOfWeek(last.scheduled);

  const allDays = {};

  let day = firstDay;
  while (day <= lastDay) {
    for (let i = 0; i < 7; i += 1) {
      const formatedDate = format(day, "YYYY-MM-DD");
      allDays[formatedDate] = allDays[formatedDate] || [];
      day = addDays(day, 1);
    }
  }

  schedules.forEach(one => {
    // ! FantanySportsAPI = one.Day
    // ! SportsRadar = one.scheduled
    // const Day = format(new Date(one.Day), "YYYY-MM-DD");
    const Day = format(new Date(one.scheduled), "YYYY-MM-DD");
    allDays[Day] = allDays[Day] || [];
    allDays[Day].push(one);
  });

  return allDays;
};
