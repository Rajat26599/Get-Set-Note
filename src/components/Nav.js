import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../App";

// IMPORTING ICONS
import cloudy from '../assets/img/weather-icons/animated/cloudy.svg';
import thunder from '../assets/img/weather-icons/animated/thunder.svg';
import drizzle from '../assets/img/weather-icons/animated/rainy-2.svg';
import rainy from '../assets/img/weather-icons/animated/rainy-6.svg';
import snowy from '../assets/img/weather-icons/animated/snowy-6.svg';
import sun from '../assets/img/weather-icons/animated/day.svg';
import moon from '../assets/img/weather-icons/animated/night.svg';

const api = {
  key: "a9346aa8cbb9cd7d78d1329ca69bdbcd",
  base: "https://api.openweathermap.org/data/2.5/",
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatDate(d) {
  if (window.screen.width < 600) {
    return "";
  }
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  // const year = d.getFullYear();
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
  return `${day.substring(0,3)}, ${date} ${month}  |  ${time}`;
}

var icon = "";

async function getWeatherForCoordinates(latitude, longitude) {
  const cityResp = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=7db30636982141cf873e9609b4e52adc`);
  const result = await cityResp.json();
  const query = result.results[0].components.city;
  const weatherResp = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
  const weather = await weatherResp.json();
  return weather;
}

// Promisified `geolocation.getCurrentPosition`
async function getCurrentPositionP() {
  return new Promise((resolve, reject) => {
    if (!window.navigator.geolocation) {
      return reject("No geolocation");
    }
    window.navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getLocalWeather() {
  const position = await getCurrentPositionP();
  const { latitude, longitude } = position.coords;
  const weather = await getWeatherForCoordinates(latitude, longitude);

  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 19;

  switch (weather.weather[0].main) {
    case "Thunderstorm":
      icon = thunder;
      break;
    case "Drizzle" || "Mist":
      icon = drizzle;
      break;
    case "Rain":
      icon = rainy;
      break;
    case "Snow":
      icon = snowy;
      break;
    case "Clear":
      if (isDayTime) icon=sun;
      else icon=moon;
      break;
    case "Clouds":
      icon = cloudy;
      break;
    default:
      icon = "";
  }

  return weather;
}

const Nav = (props) => {

  const theme = useContext(ThemeContext);

  const [weather, setWeather] = useState(null);
  useEffect(() => {
    getLocalWeather().then(setWeather, console.error);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
      <a className="navbar-brand" href="/#">
        Get-Set-Note
      </a>
      <div className={`date-${theme}`}>{formatDate(new Date())}</div>
      {weather ?
        <div className="weather">
          <img id="weather-icon" src={icon} alt="" />
          <span className={`temp-${theme}`}>{Math.round(weather.main.temp)}°c</span>
        </div>
      : null}
      
      <label className="switch">
        <input type="checkbox" onChange={props.toggleTheme}/>        
        <span className="slider round"><i className={`fas fa-${theme=="dark"?"sun":"moon"}`}></i></span>
      </label>
    </nav>
  );
};

export default Nav;

// import React, { useState, useEffect } from 'react';
//
// const api = {
//   key: "a9346aa8cbb9cd7d78d1329ca69bdbcd",
//   base: "https://api.openweathermap.org/data/2.5/"
// }
//
//
// const Nav = () => {
//
//   useEffect(() => {
//
//     const successfulLookup = position => {
//       const { latitude, longitude } = position.coords;
//       fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=f090ea5238b8437fbc5ed6d9b0f9e261`)
//         .then(response => response.json())
//         .then(result => {
//           const query = result.results[0].components.city;
//           weatherOnLoad(query);
//         })
//     };
//
//     const weatherOnLoad = query => {
//       fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
//         .then(res => res.json())
//         .then(result => {
//           setWeather(result);
//           console.log(result);
//         });
//     };
//
//     // successfulLookup();
//
//     if (window.navigator.geolocation) {
//       window.navigator.geolocation
//        .getCurrentPosition(successfulLookup, console.log);
//     }
//   }, []);
//
//
//   const [weather, setWeather] = useState({});
//
//   const dateBuilder = (d) => {
//     let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//
//     let day = days[d.getDay()];
//     let date = d.getDate();
//     let month = months[d.getMonth()];
//     let year = d.getFullYear();
//
//     return `${month} ${date}, ${year} | ${day}`
//   }
//
//
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <a className="navbar-brand" href="/#">Get-Set-Note</a>
//       <div className="date">{dateBuilder(new Date())}</div>
//       <div className="temp">
//         {weather.main ? Math.round(weather.main.temp) : ''}°c
//       </div>
//     </nav>
//   );
// };
//
// export default Nav;
