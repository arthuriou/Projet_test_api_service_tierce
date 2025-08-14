import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const city = req.query.city || "Paris";

  try {
    const data = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?",
        {
            params : {
                q: city,
                appid: process.env.OPENWEATHER_KEY,
                units: "metric",
                lang : "fr"
            }
        }
    );
    res.json({
      city: data.data.name,
      temperature: data.data.main.temp,
      description: data.data.weather[0].description,
      icon: data.data.weather[0].icon,
    });

  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur lors de la récupération des données météo" });
  }
})

export default router;