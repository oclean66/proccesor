const fullDate = () => {
    const date = new Date();
    const options = {  timeZone: 'America/Caracas' , year: "numeric", month: "2-digit", day: "2-digit" };
    const fecha = date.toLocaleString("es-VE", options).split("/").reverse().join("");
    console.log(fecha);
    return fecha;
};

const range = (n, a, b) => {
    return n >= a && n <= b;
};

module.exports = { fullDate, range };
