const heroes = require("../data/heroes.json");
const axios = require("axios");
const fs = require("fs");

const BASE_URL =
    "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react";

heroes.forEach((hero) => {
    let fPath = `${__dirname}/../public/heroes/icons/${hero.name}.png`;
    if (fs.existsSync(fPath)) {
        return;
    }
    axios({
        url: `${BASE_URL}/heroes/icons/${hero.name}.png?`,
        responseType: "stream",
        method: "GET",
    }).then((response) => {
        response.data.pipe(
            fs.createWriteStream(fPath)
        );
        console.log(`Write success for ${hero.name}`);
    }).catch((error) => {
        console.log(`Failure for ${hero.name}: ${error.message} `);
    })
});
