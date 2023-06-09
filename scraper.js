const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const BLAZE_URL = process.env.BLAZE_API_URL;
//@ZANGA_OFC_SATAN
async function pegarUltimosResultados() {
  try {
    const response = await axios.get(BLAZE_URL);
    const resultados = response.data.map((item) => item.roll);
    const cores = converterEmCores(resultados);
    return cores;
  } catch (error) {
    console.error('Erro ao obter os últimos resultados:', error);
    return [];
  }
}

function converterEmCores(resultados) {
  const cores = [];
  for (const valor of resultados) {
    if (valor === 0) {
      cores.push('B');
    } else if (valor >= 1 && valor <= 7) {
      cores.push('V');
    } else if (valor >= 8 && valor <= 14) {
      cores.push('P');
    }
  }
  return cores;
}

module.exports = {
  pegarUltimosResultados
};
