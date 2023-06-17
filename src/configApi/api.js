const axios = require("axios");

const fullDate = () => {
    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}${month}${day}`;
};

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


module.exports = {
    fullDate,
    api
}