const heroes = require("../data/heroes.json");
const axios = require("axios");
const fs = require("fs");

const BASE_URL = "https://www.dota2.com/datafeed/herodata";

heroes.forEach((hero) => {
    let fPath = `${__dirname}/../data/hero_meta/${hero.name}.json`;
    if (fs.existsSync(fPath)) {
        return;
    }
    axios({
        url: BASE_URL,
        params: {
            language: "english",
            hero_id: hero.id,
        },
        method: "GET",
    }).then((response) => {
        let heroData = response.data.result.data.heroes[0];
        fs.writeFileSync(fPath, JSON.stringify(heroData));
        console.log(`Write success for ${hero.name}`);
    }).catch((error) => {
        console.log(`Failure for ${hero.name}: ${error.message} `);
    })
});
