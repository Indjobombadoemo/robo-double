const { pegarUltimosResultados } = require('./scraper');
const { enviarSinalTelegram, enviarWinLoss, enviarGale } = require('./mybot');
const dotenv = require('dotenv');
const fs = require('fs'); 
//@ZANGA_OFC_SATAN
dotenv.config();
const estrategias = JSON.parse(fs.readFileSync('estrategias.json'));

class Blaze {
  constructor() {
    this.emAnalise = false;
    this.qtdEntrada = 0;
    this.resultado = [];
    this.verificaResultado = [];
  }

  reset() {
    this.qtdEntrada = 0;
    this.emAnalise = false;
  }

  verificaMartingale() {
    this.qtdEntrada += 1;
    if (this.qtdEntrada <= parseInt(process.env.MARTINGALE)) {
      enviarGale(this.qtdEntrada);
    } else {
      enviarWinLoss(false);
      this.reset();
    }
  }

  validaGreenLoss(resultado, cor) {
    if ((resultado[0] === 'P' && cor === '⚫️') || (resultado[0] === 'V' && cor === '🛑')) {
      enviarWinLoss(true);
      this.reset();
    } else if ((resultado[0] === 'P' && cor === '🛑') || (resultado[0] === 'V' && cor === '⚫️')) {
      this.verificaMartingale();
    } else if (resultado[0] === 'B') {
      enviarWinLoss(true);
      this.reset();
    }
  }
//by @ZANGA_OFC_SATAN
  verificaEstrategias(cores) {
    if (this.emAnalise) {
      this.validaGreenLoss(cores, this.cor_sinal);
    } else {
      for (const estrategia of estrategias) {
        const padrao = estrategia.colors;
        if (cores.slice(0, padrao.length).join('') === padrao.join('')) {
          this.cor_sinal = estrategia.cor;
          const mensagem = estrategia.mensagem;
          enviarSinalTelegram(this.cor_sinal, padrao, mensagem);
          this.emAnalise = true;
          break;
        }
      }
    }
  }
}

const blaze = new Blaze();
//by @ZANGA_OFC_SATAN
(async () => {
  while (true) {
    const resultado = await pegarUltimosResultados();
    if (JSON.stringify(resultado) !== JSON.stringify(blaze.verificaResultado)) {
      blaze.verificaResultado = resultado;
      blaze.verificaEstrategias(resultado);
    }
  }
})();
