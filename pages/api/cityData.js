export default async function handler(req, res) {
  try {
    const { latitude, longitude, timezone } = req.body;

    const getWeatherData = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_direction_10m,rain,wind_speed_10m,weather_code&timezone=${timezone}&forecast_days=1&daily=sunrise,sunset&hourly=visibility`
    );

    if (!getWeatherData.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await getWeatherData.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
