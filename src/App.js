import React, { useState } from "react";
const api = {
  key: "964e21a5f6e8d57031215667ffa0f39e",
  base: "https://api.openweathermap.org/data/2.5/",
};

function time(unix){
  var a = new Date(unix*1000);
  console.log(a);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
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
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search__box">
          <input
            type="text"
            className="search__bar"
            placeholder="Search for a city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <>
            <div className="location__box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="time__box">
              <div className="time">
                {time((weather.dt) + (weather.timezone))}
              </div>
            </div>
            <div className="weather__box">
              <div className="weather">
                <div className='weather__type'>
                {weather.weather[0].main}
                </div>
                <div className="wind">
                  {weather.wind.speed}
                </div>
              </div>
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              
            </div>
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
