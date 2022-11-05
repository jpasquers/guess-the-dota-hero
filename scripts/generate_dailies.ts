import fs from "fs";
import moment from "moment";
import { generateRandomGameInstance, getGameSeed } from "../lib/repository";

const dailiesFileName = `${__dirname}/../data/dailies.json`;

const NUM_DAYS = process.argv[2] ? process.argv[2] : 30;

let currentDailies = require(dailiesFileName);

for (let i=0; i<NUM_DAYS; i++) {
    const today = moment.utc();
    let target = today.add(i, "days");
    let key = target.format("MM/DD/YYYY");
    let value = getGameSeed(generateRandomGameInstance());
    if (!currentDailies[key]) currentDailies[key] = value;
}

fs.writeFileSync(dailiesFileName, JSON.stringify(currentDailies, null, 4));

