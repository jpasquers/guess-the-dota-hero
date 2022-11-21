const heroes = require("../data/heroes.json");
const axios = require("axios");
const fs = require("fs");

const BASE_URL =
    "https://dota2.fandom.com/wiki";

heroes.forEach((hero) => {
    let urlName = hero.localized_name.replace(" ", "_");
    axios({
        url: `${BASE_URL}/${urlName}/Lore`,
        responseType: "stream",
        method: "GET",
    }).then((response) => {
        response.data.pipe(
            fs.createWriteStream(
                `${__dirname}/../docs/lore/${hero.name}.html`
            )
        );
    });
});
