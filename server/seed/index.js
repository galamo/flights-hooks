const moment = require("moment");
const axios = require("axios");
const fs = require("fs");

async function countries() {
    const { data } = await axios.get("https://restcountries.eu/rest/v2/all");
    return data;
}

async function seedFlights(NOF) {
    const c = await countries();
    const flights = [];
    for (let index = 0; index < NOF; index++) {
        const fromIndex = Math.round(Math.random() * 120);
        const toIndex = Math.round(Math.random() * 120);
        flights.push(new Flight(c[fromIndex], c[toIndex]));
    }
    return flights;
}

function Flight(from, to) {
    this.from = from.name;
    this.fromFlag = from.flag;
    this.toFlag = to.flag;
    this.to = to.name;
    this.departure = moment()
        .add(Math.round(Math.random() * 2), "hours")
        .format("DD-MM-YYYY hh:mm:ss");
    this.arrival = moment()
        .add(Math.round(Math.random() * 10) + 3, "hours")
        .format("DD-MM-YYYY hh:mm:ss");
}

seedFlights(50).then(res => {
    fs.writeFile("./data/flights.json", JSON.stringify({ flights: res }), err =>
        console.log(err)
    );
});

module.exports = { seedFlights };