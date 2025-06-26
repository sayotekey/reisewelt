import axios from "axios";

const BASE_URL = "https://api.pexels.com/v1/search";

export async function fetchCityImage(city) {
  const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

  if (!PEXELS_API_KEY) {
    console.error("Kein PEXELS_API_KEY definiert!");
    return null;
  }

  try {
    const res = await axios.get(BASE_URL, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      params: {
        query: `${city} city`,
        per_page: 1,
      },
    });

    const photos = res.data.photos;
    if (photos && photos.length > 0) {
      return photos[0].src.large;
    } else {
      console.warn(`Kein Bild für ${city} gefunden.`);
      return null;
    }
  } catch (error) {
    console.error("Fehler beim Abrufen von Bild:", error.message);
    return null;
  }
}
