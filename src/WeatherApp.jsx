// Input más boton que busque la ciudad

import { useState } from "react";

export const WeatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "b6385109a5a43aa73163bb7d7b44d894";
  const difKelvin = 273.15;
  const difMetroSegundo = 3.6;

  const [city, setCity] = useState("");
  const [dataWeather, setDataWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`);
      const data = await response.json();
      setDataWeather(data);
    } catch (error) {
      console.warn("Ocurrio el siguiente error:", error);
    }
  };

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.length > 0) fetchWeather();
  };

  return (
    <div className="container">
      <h1>App Clima</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleChangeCity} />
        <button>Buscar</button>
      </form>

      {dataWeather && (
        <div>
          <h2>{dataWeather.name}</h2>
          <h3>Temperatura: {parseInt(dataWeather.main.temp - difKelvin)} ºC</h3>
          <h4>Condición meteorológica: {dataWeather.weather[0].main}</h4>
          <img
            src={` http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`}
            alt="icono clima"
          />
          <h4>
            Vel. Viento: {(dataWeather.wind.speed * difMetroSegundo).toFixed(2)}{" "}
            km/h
          </h4>
        </div>
      )}
    </div>
  );
};
