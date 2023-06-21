const fullDate = () => {
    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
        date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}${month}${day}`;
};

const range = (n, a, b) => {
    return n >= a && n <= b;
};

module.exports = { fullDate, range };
