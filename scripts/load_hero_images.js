const heroes = require("../data/heroes.json");
const axios = require("axios");
const fs = require("fs");

const BASE_URL =
    "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react";

heroes.forEach((hero) => {
    axios({
        url: `${BASE_URL}/heroes/${hero.name}.png?`,
        responseType: "stream",
        method: "GET",
    }).then((response) => {
        response.data.pipe(
            fs.createWriteStream(
                `${__dirname}/../public/heroes/${hero.name}.png`
            )
        );
    });
});
