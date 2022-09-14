import { chromium } from "playwright";
import notifier from "node-notifier";
import cron from "node-cron";
const TelegramBot = require("node-telegram-bot-api");
const puppeteer = require('puppeteer');

const tokenFuncionamiento = "5747844050:AAGKvj-AtvJ1ZVfaAy7t46oOzVBZ2dlmlQo";
const tokenNotificacion = "5542861904:AAEgRCpbxor5GK3i98iqYvzzL5dKp8HsAE4";
const chatId = "297484210";

try {
  cron.schedule(" * * * * *", async () => {
    console.log(
      `Running on: ${new Date().toLocaleString("es-AR", {
        timeZone: "America/Buenos_Aires",
      })}`
    );
  
    console.log("antes");
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    console.log("antes1");
    await page.goto(
      "https://www.zonakids.com/productos/pack-x-25-sobres-de-figuritas-fifa-world-cup-qatar-2022/"
    );
  
    console.log("Despues");
    const content = await page.inputValue('#product_form input[type="submit"]');
  
    if (content === "Sin stock") {
      console.log("SIN STOCK");
      const bot = new TelegramBot(tokenFuncionamiento, { polling: true });
      bot.sendMessage(chatId, "Bot Funcionando",{
        "disable_notification": true,
    });
     
      bot.stopPolling();
    } else {
      const bot = new TelegramBot(tokenNotificacion, { polling: true });
      bot.sendMessage(chatId, "Ya hay figuritas, entra a: https://www.zonakids.com/productos/pack-x-25-sobres-de-figuritas-fifa-world-cup-qatar-2022/");
      console.log("SIN STOCK");
      bot.stopPolling();
    }
  
    await browser.close();
  });
} catch (error) {
  console.log(error)
}

