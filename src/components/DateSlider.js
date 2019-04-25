import React, { useRef, useState } from "react";
import Slider from "react-slick";
import dateFns from "date-fns";

const DateSlider = () => {
  const slider = useRef();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const onDateClick = day => {
    setSelectedDate(day);
  };

  const nextWeek = () => {
    setCurrentWeek(dateFns.addWeeks(currentWeek, 1));
    slider.current.slickNext();
  };

  const prevWeek = () => {
    setCurrentWeek(dateFns.subWeeks(currentWeek, 1));
    slider.current.slickPrev();
  };

  const renderCells = weekArg => {
    const startDate = dateFns.startOfWeek(weekArg);
    const endDate = dateFns.endOfWeek(weekArg);

    const days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i += 1) {
        const cloneDay = day;
        days.push(
          <button
            onClick={() => onDateClick(dateFns.parse(cloneDay))}
            type="button">
            <div
              className={`calendar__col calendar__cell ${
                dateFns.isSameDay(day, selectedDate) ? "active-day" : ""
              }`}>
              {dateFns.format(new Date(cloneDay), "YYYY-MM-DD")}
            </div>
          </button>
        );
        day = dateFns.addDays(day, 1);
      }
    }
    return days;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: false,
  };

  return (
    <>
      <Slider ref={slider} {...settings}>
        {renderCells(currentWeek)}
      </Slider>
      <div style={{ textAlign: "center" }}>
        <button className="button" onClick={prevWeek} type="button">
          Previous
        </button>
        <button className="button" onClick={nextWeek} type="button">
          Next
        </button>
      </div>
    </>
  );
};

// // DateSlider.propTypes = {};

export default DateSlider;
