const axios = require("axios");
const fullDate = require("../helpers/getters");

const url = "https://appcelmlt.com:6444/resultadostv";
const headers = {
    "Content-Type": "application/json",
    tok: "e7f3fe7a42028493652438c8f9766b6d7b849fb2",
    desde: fullDate(),
    hasta: fullDate(),
    usu: "pepo",
};

const api = axios.create({
    baseURL: url,
    headers,
});

module.exports = api;
