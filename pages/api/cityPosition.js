export default async function cityPosition(req, res) {
  try {
    const cityConfig = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${process.env.CITY}&language=${process.env.LANGUAGE}&limit=1`
    );

    if (!cityConfig.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await cityConfig.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
