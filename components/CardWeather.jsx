import { useState, useEffect } from "react";
import axios from "axios";

export default function CardWeather() {
  const [weatherState, setWeatherState] = useState({});

  const [isFarenhheit, setIsFarenheit] = useState(true);

  function changeGrades() {
    setIsFarenheit(!isFarenhheit);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
      const crd = pos.coords;

      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=d9e71ab718e0f21c1830cea7c91534e9`
        )
        .then((res) => setWeatherState(res.data));
    }
  }, []);

  // console.log(weatherState);
  let tempInDegreesCentrigrades = (weatherState.main?.temp - 273.5).toFixed(2);
  let tempInDegreesFarenheit = tempInDegreesCentrigrades * 1.8 + 32;
  return (
    <>
      <div className="container">
        <h1> Weather App </h1>
        <h3>
          {" "}
          {weatherState.name} {weatherState.sys?.country}
        </h3>
        <div className="description">
          <div className="icon-weather">
            <img
              className="icon-big"
              src={`http://openweathermap.org/img/wn/${weatherState.weather?.[0].icon}@2x.png`}
              alt=""
            />
            <h3>
              {isFarenhheit
                ? tempInDegreesFarenheit
                : tempInDegreesCentrigrades}{" "}
              {isFarenhheit ? "farenheit" : "centigrades"}
            </h3>
          </div>
          <div className="description-weather">
            <div className="title-description">
              <p>"{weatherState.weather?.[0].description}"</p>
            </div>
            <div className="before-title-description">
              <p>
                <span>Wind speed:</span> {weatherState.wind?.speed} m/s
              </p>
              <p>
                <span>Clouds:</span> {weatherState.clouds?.all}%
              </p>
              <p>
                <span>Pressure:</span> {weatherState.main?.pressure} hPa
              </p>
            </div>
          </div>
        </div>

        <div className="container-button">
          <button onClick={changeGrades}>Change Centigrade/Farenheit</button>
        </div>
      </div>
    </>
  );
}
