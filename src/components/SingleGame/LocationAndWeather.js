import React from "react";
import PropTypes from "prop-types";

const LocationAndWeather = ({ Name, City, State, ForecastWindChill }) => {
  return (
    <div className="scoreboard-detail__location scoreboard-detail__location-and-weather">
      <ul>
        <li>
          <strong>{Name}</strong>
        </li>
        <li>{`${City}, ${State}`}</li>
      </ul>

      <div className="weather">
        <a
          href="http://www.accuweather.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="accuweather" />
        </a>
        <div className="accu-weather-icons sm icon-2" />
        {ForecastWindChill && (
          <div className="temperature">{`${ForecastWindChill}° F`}</div>
        )}
      </div>
    </div>
  );
};

LocationAndWeather.propTypes = {
  Name: PropTypes.string.isRequired,
  City: PropTypes.string.isRequired,
  State: PropTypes.string.isRequired,
  ForecastWindChill: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};

export default LocationAndWeather;
