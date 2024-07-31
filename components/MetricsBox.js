import { degToCompass } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weather, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Humidité"}
        iconSrc={"/icons/humidity.png"}
        metric={weather.current.relative_humidity_2m}
        unit={"%"}
      />
      <MetricsCard
        title={"Vitesse du vent"}
        iconSrc={"/icons/wind.png"}
        metric={getWindSpeed(unitSystem, weather.current.wind_speed_10m)}
        unit={unitSystem == "metric" ? "m/s" : "m/h"}
      />
      <MetricsCard
        title={"Direction du vent"}
        iconSrc={"/icons/compass.png"}
        metric={degToCompass(weather.current.wind_direction_10m)}
      />
      <MetricsCard
        title={"Visibilité"}
        iconSrc={"/icons/binocular.png"}
        metric={getVisibility(unitSystem, weather.hourly.visibility[0])}
        unit={unitSystem == "metric" ? "km" : "miles"}
      />
      <MetricsCard
        title={"Lever du soleil"}
        iconSrc={"/icons/sunrise.png"}
        metric={getTime(
          unitSystem,
          new Date(weather.daily.sunrise[0]).getTime(),
          weather.timezone
        )}
        unit={getAMPM(
          unitSystem,
          new Date(weather.daily.sunrise[0]).getTime(),
          weather.timezone
        )}
      />
      <MetricsCard
        title={"Coucher du soleil"}
        iconSrc={"/icons/sunset.png"}
        metric={getTime(
          unitSystem,
          new Date(weather.daily.sunset[0]).getTime(),
          weather.timezone
        )}
        unit={getAMPM(
          unitSystem,
          new Date(weather.daily.sunset[0]).getTime(),
          weather.timezone
        )}
      />
    </div>
  );
};
