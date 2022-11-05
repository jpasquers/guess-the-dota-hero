const fs = require("fs");
const heroes = require("../data/heroes.json");

const skeleton = heroes.reduce((current, nextHero) => {
    current[nextHero.name] = ["TBD", "TBD", "TBD"];
    return current;
}, {});

fs.writeFileSync(`${__dirname}/../data/unique_hero_hints.json`, JSON.stringify(skeleton));
