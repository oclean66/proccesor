const axios = require("axios");
const { fullDate } = require("./getters");
const { API_CREDENTIALS, API_URL } = require("../config");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const getResultadosApi = async () => {
  try {
    const resultados = {};
    const date = fullDate();
    const headers = {
      ...API_CREDENTIALS,
      desde: date,
      hasta: date,
    };

    const { data } = await axios.get(API_URL, { headers });
    data.forEach((element) => {
      let keyName = element.pro.toUpperCase();
      //  Check if is Zodiacal
      const isSig = /ASTRAL|ZOD/.test(element.lot);
      if (isSig) keyName += "_SIG";

      if (resultados[keyName]) {
        resultados[keyName].push(element);
      } else {
        resultados[keyName] = [];
        resultados[keyName].push(element);
      }
    });
    return resultados;
  } catch (error) {
    console.log(`Ha ocurrido un error`);
  }
};

module.exports = { getResultadosApi };
