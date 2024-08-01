import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { MetricsBox } from "../components/MetricsBox";
import { Header } from "../components/Header";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();

  useEffect(() => {

    getData().finally(() => {});

  }, 60 * 60 * 1000);


  const getData = async () => {
    const cityPosition = await fetch("/api/cityPosition", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        return res.results[0];
      });

    setCity(cityPosition);

    const resInfo = await fetch("api/cityData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        latitude: cityPosition.latitude,
        longitude: cityPosition.longitude,
        timezone: cityPosition.timezone,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        return res;
      });

    setWeather(resInfo);
  };

  return weather && !weather.message && city ? (
    <div className={styles.wrapper}>
      <MainCard
        city={city.name}
        country={city.country}
        description={""}
        iconName={weather.current.weather_code}
        weather={weather}
      />
      <ContentBox>
        <MetricsBox weather={weather} unitSystem={"metric"}> </MetricsBox>
      </ContentBox>
    </div>
  ) : weather && weather.message ? (
    <ErrorScreen errorMessage="Erreur dans le chargement de la ville"></ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Chargement des données..." />
  );
};

export default App;
