import React from "react";

const Day = ({ min, max, date, codes, getWeatherIcon, isToday, formatDay }) => {
  return (
    <li className="day">
      <span>{getWeatherIcon(codes)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.round(min)}&deg; &mdash; {Math.round(max)}&deg;
      </p>
    </li>
  );
};

export default Day;
