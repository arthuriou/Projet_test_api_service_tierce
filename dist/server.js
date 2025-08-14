"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const weather_1 = __importDefault(require("./routes/weather"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/weather", weather_1.default);
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API météo !");
});
app.listen(process.env.PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${process.env.PORT}`);
});
