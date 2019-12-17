import React from "react";

const LocationAndWeather = ({ StadiumObj, ForecastWindChill }) => {
  return (
    <div className="scoreboard-detail__location scoreboard-detail__location-and-weather">
      <ul>
        <li>
          <strong>{StadiumObj.Name}</strong>
        </li>
        <li>{`${StadiumObj.City}, ${StadiumObj.State}`}</li>
      </ul>

      <div className="weather">
        <a
          href="http://www.accuweather.com/"
          rel="noopener noreferrer"
          target="_blank">
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

export default LocationAndWeather;
