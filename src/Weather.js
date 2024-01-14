import React from "react";
import Day from "./Day";

const Weather = ({ location, weather, getWeatherIcon, formatDay }) => {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;
  return (
    <div>
      <h2>Weather of {location}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            max={max[i]}
            min={min[i]}
            date={date}
            codes={codes[i]}
            getWeatherIcon={getWeatherIcon}
            isToday={i === 0}
            formatDay={formatDay}
          />
        ))}
      </ul>
    </div>
  );
};

export default Weather;
