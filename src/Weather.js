import React from "react";
import { useState } from "react";

export default function Weather() {
  const API = "999581e4eba104115ed727ab5ef4fa2c";

  const [data, setData] = useState(null);
  const [zip, setZip] = useState("");

  const fetchWeather = (numDays) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API}&units=imperial&cnt=${numDays}`
    )
      .then((resp) => resp.json())
      .then((data) => setData(data));
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
      <div>
        <div>{data.name}</div>
        <div>{daysOfWeek[day]}</div>
        <div>{data.main.temp_min}</div>
        <div>{data.main.temp_max}</div>
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
        ></img>
      </div>
    );
  }

  return (
    <div>
      <div>Weather</div>
      <input
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
