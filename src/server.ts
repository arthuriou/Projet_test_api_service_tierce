import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import weatherRoutes from "./routes/weather";
import webhookRoutes from "./routes/webhook";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());


app.use("/weather", weatherRoutes);
app.use("/webhook", webhookRoutes);
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API météo !");
});
app.listen(process.env.PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${process.env.PORT}`);
});
