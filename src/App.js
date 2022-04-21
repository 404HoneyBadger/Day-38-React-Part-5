import React, { useEffect,useState } from 'react';
import moment from 'moment'

const api = {
  key: '856cf893bf4748da5e5e119d50885a54',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [zipCode, setZipCode] = useState(''); //gets stored and pulled, must be string
  const [weather, setWeather] = useState({}); // make an object

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?zip=${zipCode},us&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setZipCode(''); // clears out search bar
          console.log(result);
        });
    }
  }
  useEffect(() => {
    fetch(`${api.base}weather?zip=${10310},us&units=imperial&APPID=${api.key}`)
  .then(res => res.json())
  .then(result => {
    setWeather(result);
    // do something
  })}, [])

  return (
    <>
      <main>
        <div className="weather-box">
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Enter Zipcode"
              onChange={(e) => setZipCode(e.target.value)} //e is the event, similair to onClick
              value={zipCode}
              onKeyPress={search}
            />
          </div>
          {typeof weather.main != 'undefined' ? ( // '? and !' is an not/ if statement to define the default with no input
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{moment().format('lll')}</div>
              </div>

              <div className="temp">
                <div className="temp_max">
                  <div>High:</div>
                  {Math.round(weather.main.temp_max)}°F
                </div>

                <div className="temp_min">
                  <div>Low:</div>
                  {Math.round(weather.main.temp_min)}°F
                </div>

                <div className="now">
                  <div>Now:</div>
                  {Math.round(weather.main.temp)}°F
                </div>

                <div className="feelsLike">
                  <div>Feels Like:</div>
                  {Math.round(weather.main.feels_like)}°F
                </div>

                <div className='humidity'>
                  <div>Humidity:</div>
                  {Math.round(weather.main.humidity)}
                </div>
              </div>
              <div className="weather">
                <img src="https://openweathermap.org/img/wn/04n.png" alt="" />
                {weather.weather[0].main}
              </div>
            </div>
          ) : (
            ' '
          )}
        </div>
      </main>
    </>
  );
}

export default App;
