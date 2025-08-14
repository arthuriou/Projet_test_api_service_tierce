import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import weatherRoutes from "./routes/weather";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use("/weather", weatherRoutes);
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API météo !");
});
app.listen(process.env.PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${process.env.PORT}`);
});
