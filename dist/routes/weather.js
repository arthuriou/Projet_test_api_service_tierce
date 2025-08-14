"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const city = req.query.city || "Paris";
    try {
        const data = yield axios_1.default.get("https://api.openweathermap.org/data/2.5/weather?", {
            params: {
                q: city,
                appid: process.env.OPENWEATHER_KEY,
                units: "metric",
                lang: "fr"
            }
        });
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
}));
exports.default = router;
