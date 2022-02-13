import React from "react";
import { useState } from "react";

export default function Weather() {
  const API = "999581e4eba104115ed727ab5ef4fa2c";

  const [data, setData] = useState(null);
  const [zip, setZip] = useState("");

  const fetchWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API}&units=imperial`
    )
      .then((resp) => resp.json())
      .then((data) => setData(data));
    setZip("");
  };
  let renderedData = null;

  if (data === null) {
    renderedData = null;
  } else {
    renderedData = (
      <div>
        <div>{data.name}</div>
        <div>{data.main.temp_min}</div>
        <div>{data.main.temp_min}</div>
        <div>{data.weather[0][1]}</div>
        <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="img"></img>
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
      <button onClick={() => fetchWeather()}>Weather Report</button>
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
