import Image from "next/image";
import { ctoF } from "../services/converters";
import styles from "./MainCard.module.css";

const weatherIcons = {
  0: "☀️", // Clear sky
  1: "🌤️", // Mainly clear
  2: "⛅", // Partly cloudy
  3: "☁️", // Overcast
  45: "🌫️", // Fog
  48: "🌫️", // Depositing rime fog
  51: "🌦️", // Drizzle: Light
  53: "🌧️", // Drizzle: Moderate
  55: "🌧️", // Drizzle: Dense intensity
  56: "🌦️", // Freezing Drizzle: Light
  57: "🌧️", // Freezing Drizzle: Dense intensity
  61: "🌦️", // Rain: Slight
  63: "🌧️", // Rain: Moderate
  65: "🌧️", // Rain: Heavy intensity
  66: "🌨️", // Freezing Rain: Light
  67: "🌨️", // Freezing Rain: Heavy intensity
  71: "🌨️", // Snow fall: Slight
  73: "❄️", // Snow fall: Moderate
  75: "❄️", // Snow fall: Heavy intensity
  77: "🌨️", // Snow grains
  80: "🌦️", // Rain showers: Slight
  81: "🌧️", // Rain showers: Moderate
  82: "🌧️", // Rain showers: Violent
  85: "🌨️", // Snow showers slight
  86: "❄️", // Snow showers heavy
  95: "⛈️", // Thunderstorm: Slight or moderate
  96: "⛈️", // Thunderstorm with slight hail
  99: "⛈️", // Thunderstorm with heavy hail
};

export const MainCard = ({
  city,
  country,
  description,
  iconName,
  weather,
}) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city}, {country}
      </h1>
      <p className={styles.description}>{description}</p>
      <div id="weather-container">
              <div id="weather-icon">{weatherIcons[iconName]}</div>
          </div>
      <h1 className={styles.temperature}>
        {Math.round(weather.current.temperature_2m)}°C {" "}
      </h1>
      <h4 className={styles.temperatureF}>( {Math.round(ctoF(weather.current.temperature_2m))} °F ) </h4>
      <br></br>
      <p>
        Ressenti{" "}
        {Math.round(weather.current.apparent_temperature)}
        °C (Feels like {Math.round(ctoF(weather.current.apparent_temperature))} °F )
      </p>
    </div>
  );
};
