const telebot = require('telebot');
const dotenv = require('dotenv');
const fs = require('fs');
//by@ZANGA_OFC_SATAN
dotenv.config();
const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const bot = new telebot(TOKEN);

function salvarTipEnviada(cor, padrao, msg) {
  fs.appendFileSync('tips_enviadas.csv', `${cor}, ${padrao}, ${msg.message_id}\n`);
}

function enviarGale(martingale) {
  bot.sendMessage(CHAT_ID, `Atenção gale: ${martingale}`);
}

function enviarWinLoss(Result) {
  if (Result) {
  bot.sendMessage(CHAT_ID, `✅✅✅ GREEN ✅✅✅`);
  } else if (Result === "Branco") {
  bot.sendMessage(CHAT_ID, `✅✅✅ Branco ✅✅✅`);
  } else {
  bot.sendMessage(CHAT_ID, `🚫🚫🚫 LOSS 🚫🚫🚫`);
  }
}


function enviarSinalTelegram(cor, padrao, mensagem) {
  bot.sendMessage(CHAT_ID, mensagem, { parseMode: 'HTML' })
    .then(chat => {
      salvarTipEnviada(cor, padrao, chat);
    });
}

bot.start();

module.exports = {
  enviarGale,
  enviarWinLoss,
  enviarSinalTelegram
};
