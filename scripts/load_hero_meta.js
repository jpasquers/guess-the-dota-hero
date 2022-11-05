const heroes = require("../data/heroes.json");
const axios = require("axios");
const fs = require("fs");

const BASE_URL = "https://www.dota2.com/datafeed/herodata";

heroes.forEach((hero) => {
    axios({
        url: BASE_URL,
        params: {
            language: "english",
            hero_id: hero.id,
        },
        method: "GET",
    }).then((response) => {
        let heroData = response.data.result.data.heroes[0];
        fs.writeFileSync(
            `${__dirname}/../data/hero_meta/${hero.name}.json`,
            JSON.stringify(heroData)
        );
    });
});
