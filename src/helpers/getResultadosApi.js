const axios = require("axios");
const { fullDate } = require("./getters");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const url = "https://appcelmlt.com:6444/resultadostv";
const headers = {
  "Content-Type": "application/json",
  tok: "e7f3fe7a42028493652438c8f9766b6d7b849fb2",
  desde: fullDate(),
  hasta: fullDate(),
  usu: "pepo",
};

const getResultadosApi = async () => {
  try {
    const resultados = {};
    const { data } = await axios.get(url, { headers });
    data.forEach((element) => {
      if (resultados[element.pro]) {
        resultados[element.pro].push(element);
      } else {
        resultados[element.pro] = [];
        resultados[element.pro].push(element);
      }
    });
    return resultados;
  } catch (error) {
    console.log(`Ha ocurrido un error`);
  }
};

getResultadosApi();

module.exports = getResultadosApi;
