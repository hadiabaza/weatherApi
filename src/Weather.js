import React from "react";
import { useState } from "react";

export default function Weather() {
  const API = "999581e4eba104115ed727ab5ef4fa2c";

  const [data, setData] = useState(null);
  const [zip, setZip] = useState("");

  const fetchWeather = (numDays) => {
    const oneDay = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API}&units=imperial&cnt=${numDays}`;
    const fiveDay = `https://api.openweathermap.org/data/2.5/forecast/daily?zip=${zip}&appid=${API}&cnt=${numDays}`;
    // console.log(numDays);
    fetch(numDays === 1? oneDay: fiveDay)
          .then((resp) => resp.json())
          .then((data) => setData((data)));
    setZip("");
  };

  let renderedData = null;
  let today = new Date();
  let day = today.getDay();
  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  if (data === null) {
    renderedData = null;
  } else {
    renderedData = (
      <div className="grid-container">
        <div>{data.name}</div>
        <div>{daysOfWeek[day]}</div>
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
        ></img>
        <div>Low: {data.main.temp_min}</div>
        <div>High: {data.main.temp_max}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="title">Weather</div>
      <input
        className="input-field"
        type="text"
        placeholder="Enter Zip Code"
        onChange={(e) => setZip(e.target.value)}
        value={zip}
      ></input>
      <button onClick={() => fetchWeather(1)}>Weather Report</button>
      <button onClick={() => fetchWeather(5)}>5 day Forecast</button>
      {renderedData}
    </div>
  );
}

// useEffect(async () =>{

//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API}`)
//     const data = await response.json()
//     setData(data)

// },[])

//
